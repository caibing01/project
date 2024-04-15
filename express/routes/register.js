// routes/register.js
const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// 注册接口
router.post('/', (req, res) => {
  const { username, phoneNumber, email, password } = req.body;

  // 查询数据库判断用户名、手机号、邮箱是否已存在
  connection.query('SELECT * FROM users WHERE username = ? OR phoneNumber = ? OR email = ?', [username, phoneNumber, email], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        // 用户名、手机号或邮箱已存在
        res.status(400).json({ error: 'Username, phone number, or email already exists' });
      } else {
        // 插入数据到数据库
        connection.query('INSERT INTO users (username, phoneNumber, email, password) VALUES (?, ?, ?, ?)', [username, phoneNumber, email, password], (error, results) => {
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
