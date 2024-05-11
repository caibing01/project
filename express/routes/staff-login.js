// routes/staff-login.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 登录页面路由
router.get('/login', (req, res) => {
  // 检查是否存在错误消息
  const error = req.query.error === 'true';
  res.render('login', { error });
});

// 登录逻辑路由
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 查询数据库，检查用户是否存在并验证密码
  db.query('SELECT * FROM proinfo WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err || results.length === 0) {
      // 登录失败，重定向回登录页面并显示错误消息
      return res.redirect('/staff/login?error=true');
    } else {
      // 登录成功，将用户信息存储在会话中
      const user = results[0]; // 获取第一个匹配的用户
      req.session.user = user; // 将用户信息存储在会话中
      // 重定向到工作页面
      return res.redirect('/staff/work');
    }
  });
});

// 工作页面路由，需要登录后才能访问
router.get('/work', (req, res) => {
  // 检查会话中是否存在用户信息
  if (req.session.user) {
    // 从会话中获取用户信息
    const user = req.session.user;
    res.render('work', { user });
  } else {
    // 未登录，重定向到登录页面
    res.redirect('/staff/login');
  }
});

module.exports = router;
