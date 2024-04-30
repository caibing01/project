const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 获取订单列表
router.get('/orders', (req, res) => {
  const sql = 'SELECT * FROM orders';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('获取订单时出错:', err);
      res.status(500).json({ error: '获取订单时出错' });
    } else {
      res.json(results);
    }
  });
});

// 获取单个订单信息
router.get('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const sql = `SELECT * FROM orders WHERE id = ?`;
  db.query(sql, orderId, (err, result) => {
    if (err) {
      console.error('获取订单时出错:', err);
      res.status(500).json({ error: '获取订单时出错' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: '未找到订单' });
      } else {
        res.json(result[0]);
      }
    }
  });
});

// 删除订单
router.delete('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const sql = `DELETE FROM orders WHERE id = ?`;
  db.query(sql, orderId, (err, result) => {
    if (err) {
      console.error('删除订单时出错:', err);
      res.status(500).json({ error: '删除订单时出错' });
    } else {
      res.json({ message: '订单删除成功' });
    }
  });
});

// 更新订单（更新所有字段）
router.put('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const { category, staff, datetime, completed } = req.body;
  const sql = `UPDATE orders SET category = ?, staff = ?, datetime = ?, completed = ? WHERE id = ?`;
  db.query(sql, [category, staff, datetime, completed, orderId], (err, result) => {
    if (err) {
      console.error('更新订单时出错:', err);
      res.status(500).json({ error: '更新订单时出错' });
    } else {
      res.json({ message: '订单更新成功' });
    }
  });
});

// 标记订单为已完成
router.post('/orders/:id/markCompleted', (req, res) => {
  const orderId = req.params.id;
  const sql = `UPDATE orders SET completed = 1 WHERE id = ?`;
  db.query(sql, orderId, (err, result) => {
    if (err) {
      console.error('标记订单为已完成时出错:', err);
      res.status(500).json({ error: '标记订单为已完成时出错' });
    } else {
      res.json({ message: '订单标记为已完成成功' });
    }
  });
});

// 获取员工列表
router.get('/staff', (req, res) => {
  const sql = 'SELECT * FROM proinfo';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('获取员工列表时出错:', err);
      res.status(500).json({ error: '获取员工列表时出错' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
