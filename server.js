// Import dependencies
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Middleware
app.use(express.json());

// Test API Route
app.get('/', (req, res) => {
  res.send('Trading App Backend is Running!');
});

// Get Stocks Data (Dummy Data for Now)
app.get('/stocks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stocks');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

