// routes/staff-comment.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 查看评论页面路由
router.get('/', (req, res) => {
  // 查询数据库，获取所有评论信息
  db.query('SELECT * FROM comments', (err, results) => {
    if (err) {
      console.error("Error retrieving comments:", err);
      return res.status(500).send("Error retrieving comments.");
    }
    // 渲染评论页面，并传递评论列表给模板
    res.render('work/comment', { comments: results });
  });
});

module.exports = router;
