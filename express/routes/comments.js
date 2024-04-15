// routes/comments.js
const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// 获取物业人员名单路由
router.get('/propertyStaffs', (req, res) => {
    connection.query('SELECT name FROM proinfo', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const propertyStaffs = results.map(result => result.name);
            res.status(200).json(propertyStaffs);
        }
    });
});

// 提交评论路由
router.post('/submit', (req, res) => {
    const { username, staff, comment } = req.body;
    const submissionTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // 获取当前时间

    connection.query('INSERT INTO comments (username, staff, comment, submission_time) VALUES (?, ?, ?, ?)',
        [username, staff, comment, submissionTime], (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(200).json({ message: 'Comment submitted successfully' });
            }
        });
});

// 获取评论列表路由
router.get('/list', (req, res) => {
    connection.query('SELECT * FROM comments', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;
