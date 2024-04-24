// routes/users.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/:email', (req, res) => {
  const email = req.params.email;
  const query = `SELECT * FROM users WHERE email = ?`;
  pool.query(query, [email], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    const user = results[0];
    res.json({
      id: user.id,
      username: user.username,
      phoneNumber: user.phoneNumber,
      email: user.email,
      balance: user.balance // 假设数据库中有余额字段名为 balance
    });
  });
});

module.exports = router;
