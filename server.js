/**
 * UPSC MCQ — MongoDB Backend
 * ──────────────────────────
 * Endpoints:
 *   POST /api/score        → save a quiz result
 *   GET  /api/leaderboard  → top 50 results
 *   GET  /api/health       → health check
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3001;

/* ── MongoDB Connection Caching ──────────────────────────────── */
const MONGO_URI = process.env.MONGODB_URI;
const DB_NAME   = process.env.DB_NAME   || 'upsc_quiz';
const COL_NAME  = process.env.COL_NAME  || 'leaderboard';

let client = null;
let col = null;

async function getCollection() {
  if (col) return col;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment variables');
  }

  if (!client) {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    console.log('✅  MongoDB connected');
  }

  const db = client.db(process.env.DB_NAME || DB_NAME);
  col = db.collection(process.env.COL_NAME || COL_NAME);

  // Ensure indexes for fast leaderboard sorting
  await col.createIndex({ score: -1, createdAt: 1 }).catch(() => {});
  return col;
}

/* ── Middleware ──────────────────────────────────────────────── */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

/* ── Routes ──────────────────────────────────────────────────── */

// Health check (supports both /api/health and /health)
app.get(['/api/health', '/health'], async (_req, res) => {
  let dbStatus = 'disconnected';
  try {
    if (process.env.MONGODB_URI) {
      await getCollection();
      dbStatus = 'connected';
    } else {
      dbStatus = 'missing_MONGODB_URI';
    }
  } catch (err) {
    dbStatus = 'error: ' + err.message;
  }
  res.json({ ok: true, database: dbStatus, ts: new Date().toISOString() });
});

// Root route - serve index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// POST /api/score — save a new result
app.post(['/api/score', '/score'], async (req, res) => {
  try {
    const { name, score, total, contact } = req.body;

    if (!name || score === undefined) {
      return res.status(400).json({ ok: false, error: 'name and score are required' });
    }

    const collection = await getCollection();
    await collection.insertOne({
      name:      String(name).trim().slice(0, 100),
      score:     Number(score),
      total:     Number(total) || 5,
      contact:   String(contact || '').trim().slice(0, 200),
      createdAt: new Date()
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('POST /api/score error:', err.message);
    res.status(500).json({ ok: false, error: err.message || 'Server error' });
  }
});

// GET /api/leaderboard — top 50 sorted by score ↓, createdAt ↑
app.get(['/api/leaderboard', '/leaderboard'], async (req, res) => {
  try {
    const collection = await getCollection();
    const docs = await collection
      .find({}, { projection: { _id: 0, name: 1, score: 1, total: 1, createdAt: 1 } })
      .sort({ score: -1, createdAt: 1 })
      .limit(50)
      .toArray();

    res.json({ ok: true, data: docs });
  } catch (err) {
    console.error('GET /api/leaderboard error:', err.message);
    res.status(500).json({ ok: false, error: err.message || 'Server error' });
  }
});

/* ── Standalone Start (only when run directly) ───────────────── */
if (require.main === module) {
  if (!MONGO_URI) {
    console.warn('⚠️  MONGODB_URI is not set in .env — score saving will fail until configured.');
  } else {
    getCollection().catch(err => {
      console.warn('⚠️  MongoDB initial connection warning:', err.message);
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀  Server running at http://localhost:${PORT}`);
    console.log(`    GET  http://localhost:${PORT}/`);
    console.log(`    POST http://localhost:${PORT}/api/score`);
    console.log(`    GET  http://localhost:${PORT}/api/leaderboard`);
  });
}

module.exports = app;
