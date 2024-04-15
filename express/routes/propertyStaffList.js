const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 获取物业人员信息
router.get('/', (req, res) => {
  const query = 'SELECT name, phone, address,email FROM proinfo';
  db.query(query, (err, results) => {
    if (err) {
      console.error('获取物业人员信息失败:', err);
      res.status(500).json({ message: '获取物业人员信息失败' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
