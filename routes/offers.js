const express = require('express');
const db = require('../database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

// Get all offers
router.get('/', authenticateToken, async (req, res) => {
  try {
    const offers = await db.all('SELECT * FROM offers');
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get active offer
router.get('/active', authenticateToken, async (req, res) => {
  try {
    const offer = await db.get('SELECT * FROM offers WHERE is_active = 1');
    res.json(offer || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Activate offer (Admin only)
router.put('/:id/activate', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    // Deactivate all offers first
    await db.run('UPDATE offers SET is_active = 0');

    // Activate the selected offer
    await db.run('UPDATE offers SET is_active = 1 WHERE id = ?', [req.params.id]);

    res.json({ message: 'Offer activated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deactivate all offers (Admin only)
router.put('/deactivate/all', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    await db.run('UPDATE offers SET is_active = 0');
    res.json({ message: 'All offers deactivated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update offer (Admin only)
router.put('/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { name, type, boost_percent, interest_rate } = req.body;

    await db.run(
      'UPDATE offers SET name = ?, type = ?, boost_percent = ?, interest_rate = ? WHERE id = ?',
      [name, type, boost_percent || 0, interest_rate || 0, req.params.id]
    );

    res.json({ message: 'Offer updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
