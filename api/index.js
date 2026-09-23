/**
 * Vercel Serverless Function Handler
 * Forwards requests to the Express application in server.js
 */
const app = require('../server');

module.exports = app;
