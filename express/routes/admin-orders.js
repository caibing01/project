const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 获取订单列表
router.get('/orders', (req, res) => {
  const sql = 'SELECT * FROM orders';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Error fetching orders' });
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
      console.error('Error fetching order:', err);
      res.status(500).json({ error: 'Error fetching order' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'Order not found' });
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
      console.error('Error deleting order:', err);
      res.status(500).json({ error: 'Error deleting order' });
    } else {
      res.json({ message: 'Order deleted successfully' });
    }
  });
});

// 更新订单（仅更新category和staff字段）
router.put('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const { category, staff } = req.body;
  const sql = `UPDATE orders SET category = ?, staff = ? WHERE id = ?`;
  db.query(sql, [category, staff, orderId], (err, result) => {
    if (err) {
      console.error('Error updating order:', err);
      res.status(500).json({ error: 'Error updating order' });
    } else {
      res.json({ message: 'Order updated successfully' });
    }
  });
});

// 获取员工列表
router.get('/staff', (req, res) => {
  const sql = 'SELECT * FROM proinfo';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching staff:', err);
      res.status(500).json({ error: 'Error fetching staff' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
