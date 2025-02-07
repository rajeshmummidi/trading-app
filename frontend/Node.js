// Import dependencies
const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');
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

// Fetch Live Stock Data from NSE India
app.get('/stocks', async (req, res) => {
  try {
    const response = await axios.get('https://www.nseindia.com/api/quote-equity?symbol=RELIANCE', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const stockData = response.data;

    res.json({
      name: stockData.info.companyName,
      price: stockData.priceInfo.lastPrice,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching stock data');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

