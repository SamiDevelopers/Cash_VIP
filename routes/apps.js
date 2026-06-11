const express = require('express');
const db = require('../database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

// Get all apps
router.get('/', authenticateToken, async (req, res) => {
  try {
    const apps = await db.all('SELECT * FROM apps ORDER BY name ASC');
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single app
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const app = await db.get('SELECT * FROM apps WHERE id = ?', [req.params.id]);
    if (!app) return res.status(404).json({ error: 'App not found' });
    res.json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new app (Admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { name, basic_rate, client_rate, accounting_rate } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'App name is required' });
    }

    const result = await db.run(
      'INSERT INTO apps (name, basic_rate, client_rate, accounting_rate) VALUES (?, ?, ?, ?)',
      [name, basic_rate || 0, client_rate || 0, accounting_rate || 0]
    );

    res.status(201).json({ id: result.id, name, basic_rate, client_rate, accounting_rate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update app (Admin only)
router.put('/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { name, basic_rate, client_rate, accounting_rate } = req.body;

    await db.run(
      'UPDATE apps SET name = ?, basic_rate = ?, client_rate = ?, accounting_rate = ? WHERE id = ?',
      [name, basic_rate, client_rate, accounting_rate, req.params.id]
    );

    res.json({ message: 'App updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete app (Admin only)
router.delete('/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    await db.run('DELETE FROM apps WHERE id = ?', [req.params.id]);
    res.json({ message: 'App deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
