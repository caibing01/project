const express = require('express');
const router = express.Router();
const db = require('../config/db'); // 引入数据库连接模块

// 处理重置密码请求
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // 首先检查用户名是否存在
  const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      console.error('查询用户失败', err);
      return res.status(500).json({ message: '服务器内部错误' });
    }
    if (results.length === 0) {
      // 用户名不存在
      return res.status(404).json({ message: '用户名不存在' });
    }

    // 用户名存在，更新密码
    const updatePasswordQuery = 'UPDATE users SET password = ? WHERE username = ?';
    db.query(updatePasswordQuery, [password, username], (err, result) => {
      if (err) {
        console.error('密码重置失败', err);
        res.status(500).json({ message: '密码重置失败' });
      } else {
        console.log('密码重置成功');
        res.status(200).json({ message: '密码重置成功' });
      }
    });
  });
});

module.exports = router;
