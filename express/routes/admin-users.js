// routes/admin-users.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Error fetching users' });
        } else {
            res.json(results);
        }
    });
});

// Delete user
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', userId, (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Error deleting user' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    });
});

module.exports = router;
