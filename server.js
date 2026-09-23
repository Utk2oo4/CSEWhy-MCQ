/**
 * UPSC MCQ — MongoDB Backend
 * ──────────────────────────
 * Endpoints:
 *   POST /api/score        → save a quiz result
 *   GET  /api/leaderboard  → top 50 results
 *   GET  /api/health       → health check
 */

require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const { MongoClient } = require('mongodb');

const app  = express();
const PORT = process.env.PORT || 3001;

/* ── MongoDB ─────────────────────────────────────────────────── */
const MONGO_URI = process.env.MONGODB_URI;
const DB_NAME   = process.env.DB_NAME   || 'upsc_quiz';
const COL_NAME  = process.env.COL_NAME  || 'leaderboard';

if (!MONGO_URI) {
  console.error('❌  MONGODB_URI is not set in .env — please add it and restart.');
  process.exit(1);
}

let col; // MongoDB collection reference

async function connectDB() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log('✅  MongoDB connected');

  const db = client.db(DB_NAME);
  col = db.collection(COL_NAME);

  // Indexes for fast leaderboard queries
  await col.createIndex({ score: -1, createdAt: 1 });
  console.log('✅  Indexes ensured');
}

/* ── Middleware ──────────────────────────────────────────────── */
app.use(cors()); // allow all origins — restrict in production if needed
app.use(express.json());
app.use(express.static(__dirname)); // serve index.html, style.css, config.js

/* ── Routes ──────────────────────────────────────────────────── */

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// POST /api/score  — save a new result
app.post('/api/score', async (req, res) => {
  try {
    const { name, score, total, contact } = req.body;

    if (!name || score === undefined) {
      return res.status(400).json({ ok: false, error: 'name and score are required' });
    }

    await col.insertOne({
      name:      String(name).trim().slice(0, 100),
      score:     Number(score),
      total:     Number(total) || 5,
      contact:   String(contact || '').trim().slice(0, 200),
      createdAt: new Date()
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('POST /api/score error:', err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// GET /api/leaderboard  — top 50 sorted by score ↓, createdAt ↑
app.get('/api/leaderboard', async (req, res) => {
  try {
    const docs = await col
      .find({}, { projection: { _id: 0, name: 1, score: 1, total: 1, createdAt: 1 } })
      .sort({ score: -1, createdAt: 1 })
      .limit(50)
      .toArray();

    res.json({ ok: true, data: docs });
  } catch (err) {
    console.error('GET /api/leaderboard error:', err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

/* ── Start ───────────────────────────────────────────────────── */
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀  Server running at http://localhost:${PORT}`);
      console.log(`    POST http://localhost:${PORT}/api/score`);
      console.log(`    GET  http://localhost:${PORT}/api/leaderboard`);
    });
  })
  .catch(err => {
    console.error('❌  Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
