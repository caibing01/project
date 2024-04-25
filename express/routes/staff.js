const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 获取所有员工信息
router.get('/', (req, res) => {
  const sql = 'SELECT name FROM proinfo';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching staff:', err);
      res.status(500).json({ error: 'Error fetching staff' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
