const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 登录页面路由
router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'public' });
});

// 登录逻辑路由
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 查询数据库验证管理员用户名和密码
    db.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                // 登录成功，重定向到管理员仪表盘页面
                res.redirect('/admin/dashboard');
            } else {
                // 登录失败，重定向回登录页面并显示错误消息
                res.redirect('/admin/login?error=1');
            }
        }
    });
});

// 仪表盘页面路由
router.get('/dashboard', (req, res) => {
    res.sendFile('dashboard.html', { root: 'public' });
});

module.exports = router;
