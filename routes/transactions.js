const express = require('express');
const db = require('../database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all transactions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate, appId } = req.query;
    let query = 'SELECT t.*, a.name as app_name, u.username as created_by_name FROM transactions t LEFT JOIN apps a ON t.app_id = a.id LEFT JOIN users u ON t.created_by = u.id WHERE 1=1';
    const params = [];

    if (startDate) {
      query += ' AND DATE(t.created_at) >= ?';
      params.push(startDate);
    }

    if (endDate) {
      query += ' AND DATE(t.created_at) <= ?';
      params.push(endDate);
    }

    if (appId) {
      query += ' AND t.app_id = ?';
      params.push(appId);
    }

    query += ' ORDER BY t.created_at DESC';

    const transactions = await db.all(query, params);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create transaction
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      client_name,
      client_phone,
      app_id,
      amount,
      net_received,
      deducted_amount,
      total_discount_rate,
      interest_rate,
      duration_months,
      monthly_installment,
      total_interest,
      total_amount,
      offer_id,
      notes
    } = req.body;

    const result = await db.run(
      `INSERT INTO transactions (
        client_name, client_phone, app_id, amount, net_received, deducted_amount,
        total_discount_rate, interest_rate, duration_months, monthly_installment,
        total_interest, total_amount, offer_id, notes, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        client_name,
        client_phone,
        app_id,
        amount,
        net_received,
        deducted_amount,
        total_discount_rate,
        interest_rate || 0,
        duration_months || 24,
        monthly_installment,
        total_interest || 0,
        total_amount,
        offer_id || null,
        notes || '',
        req.user.id
      ]
    );

    res.status(201).json({ id: result.id, message: 'Transaction created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction statistics
router.get('/stats/dashboard', authenticateToken, async (req, res) => {
  try {
    const totalTransactions = await db.get('SELECT COUNT(*) as count, SUM(amount) as total_amount FROM transactions');
    const todayTransactions = await db.get("SELECT COUNT(*) as count, SUM(amount) as total_amount FROM transactions WHERE DATE(created_at) = DATE('now')");
    const totalNetReceived = await db.get('SELECT SUM(net_received) as total FROM transactions');

    res.json({
      totalTransactions: totalTransactions.count || 0,
      totalAmount: totalTransactions.total_amount || 0,
      todayCount: todayTransactions.count || 0,
      todayAmount: todayTransactions.total_amount || 0,
      totalNetReceived: totalNetReceived.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
