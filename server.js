require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

// Import routes
const authRoutes = require('./routes/auth');
const appsRoutes = require('./routes/apps');
const transactionsRoutes = require('./routes/transactions');
const offersRoutes = require('./routes/offers');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/apps', appsRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/offers', offersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await db.initializeDatabase();
    await db.seedInitialData();
    console.log('Database initialized successfully');

    app.listen(PORT, () => {
      console.log(`🚀 VIP Cash Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await db.close();
  process.exit(0);
});

startServer();
