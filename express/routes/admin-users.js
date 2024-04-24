// routes/admin-users.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 获取所有用户
router.get('/', (req, res) => {
    db.query('SELECT id, username, email, phoneNumber FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Error fetching users' });
        } else {
            res.json(results);
        }
    });
});

// 删除用户
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
