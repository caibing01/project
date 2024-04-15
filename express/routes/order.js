// routes/orders.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 提交预约
router.post('/submit', (req, res) => {
  const { username, datetime, category, staff } = req.body;
  const submissionTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // 获取当前时间

  const query = 'INSERT INTO orders (username, datetime, category, staff, submission_time) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [username, datetime, category, staff, submissionTime], (error, results) => {
    if (error) {
      console.error('Error making appointment:', error);
      res.status(500).send('Internal server error');
    } else {
      res.status(201).send('Appointment made successfully');
    }
  });
});

module.exports = router;
