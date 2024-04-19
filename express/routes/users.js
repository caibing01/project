// routes/users.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 获取所有用户
router.get('/', (req, res) => {
  const query = 'SELECT id, username, phone_number AS phoneNumber, email, balance FROM users';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal server error');
    } else {
      res.status(200).json(results);
    }
  });
});

// 根据用户ID获取用户信息
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT username, phone_number AS phoneNumber, email, balance FROM users WHERE id = ?';
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Internal server error');
    } else {
      if (results.length === 0) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
});

module.exports = router;
