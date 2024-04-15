// routes/resetPasswordRouter.js

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // 引入数据库连接模块

// 处理重置密码请求
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // 查询数据库，找到对应的用户并更新密码
  const query = 'UPDATE users SET password = ? WHERE email = ?';
  db.query(query, [password, email], (err, result) => {
    if (err) {
      console.error('密码重置失败', err);
      res.status(500).json({ message: '密码重置失败' });
    } else {
      console.log('密码重置成功');
      res.status(200).json({ message: '密码重置成功' });
    }
  });
});

module.exports = router;
