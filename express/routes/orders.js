const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 创建订单
router.post('/', (req, res) => {
  const { username, datetime, category, staff, address } = req.body;
  const submissionTime = new Date(); // 获取当前时间
  const sql = 'INSERT INTO orders (username, datetime, category, staff, address, submission_time) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [username, datetime, category, staff, address, submissionTime], (err, result) => {
    if (err) {
      console.error('Error creating order:', err);
      res.status(500).json({ error: 'Error creating order' });
    } else {
      res.json({ message: 'Order created successfully' });
    }
  });
});

module.exports = router;
