// routes/login.js
const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// 登录接口，验证邮箱和密码是否正确
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // 查询数据库验证邮箱和密码是否匹配
  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        if (user.password === password) {
          // 邮箱和密码匹配，返回登录成功
          res.status(200).json({ message: 'Login successful' });
        } else {
          // 密码不正确，返回登录失败
          res.status(401).json({ error: 'Incorrect password' });
        }
      } else {
        // 邮箱不存在，返回登录失败
        res.status(401).json({ error: 'Email not found' });
      }
    }
  });
});

module.exports = router;
