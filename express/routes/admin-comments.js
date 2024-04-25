// routes/admin-comments.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 获取评论列表
router.get('/comments', (req, res) => {
  const sql = 'SELECT * FROM comments';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching comments:', err);
      res.status(500).json({ error: 'Error fetching comments' });
    } else {
      res.json(results);
    }
  });
});

// 删除评论
router.delete('/comments/:id', (req, res) => {
  const commentId = req.params.id;
  const sql = `DELETE FROM comments WHERE id = ?`;
  db.query(sql, commentId, (err, result) => {
    if (err) {
      console.error('Error deleting comment:', err);
      res.status(500).json({ error: 'Error deleting comment' });
    } else {
      res.json({ message: 'Comment deleted successfully' });
    }
  });
});

module.exports = router;
