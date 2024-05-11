const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 物业人员注册接口
router.post('/register', (req, res) => {
  const { name, phone, email, address, password } = req.body;

  // 查询数据库判断用户名、手机号、邮箱是否已存在
  db.query('SELECT * FROM proinfo WHERE name = ? OR phone = ? OR email = ?', [name, phone, email], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        // 用户名、手机号或邮箱已存在
        res.status(400).json({ error: 'Name, phone number, or email already exists' });
      } else {
        // 插入数据到数据库
        db.query('INSERT INTO proinfo (name, phone, email, address, password) VALUES (?, ?, ?, ?, ?)', [name, phone, email, address, password], (error, results) => {
          if (error) {
            res.status(500).json({ error: 'Internal server error' });
          } else {
            res.status(200).json({ message: 'Registration successful' });
          }
        });
      }
    }
  });
});

module.exports = router;
