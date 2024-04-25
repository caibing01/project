const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 获取管理员列表
router.get('/admins', (req, res) => {
  const sql = 'SELECT * FROM admin';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching admins:', err);
      res.status(500).json({ error: 'Error fetching admins' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
