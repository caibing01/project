const express = require('express');
const pool = require('../config/db');

const router = express.Router();

// 获取所有订单
router.get('/', (req, res) => {
  const username = req.query.username; // 获取前端传递的用户名参数
  let query = 'SELECT * FROM orders';
  let params = [];

  if (username) {
    query += ' WHERE username = ?'; // 根据用户名筛选订单
    params.push(username);
  }

  pool.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ success: false, message: 'Error fetching orders' });
    } else {
      res.json(results);
    }
  });
});

// 删除订单
router.delete('/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  pool.query('DELETE FROM orders WHERE id = ?', orderId, (err, results) => {
    if (err) {
      console.error('Error deleting order:', err);
      res.status(500).json({ success: false, message: 'Error deleting order' });
    } else {
      res.json({ success: true, message: 'Order deleted successfully' });
    }
  });
});

// 修改订单
router.put('/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const { category, staff } = req.body;
  pool.query('UPDATE orders SET category = ?, staff = ? WHERE id = ?', [category, staff, orderId], (err, results) => {
    if (err) {
      console.error('Error updating order:', err);
      res.status(500).json({ success: false, message: 'Error updating order' });
    } else {
      res.json({ success: true, message: 'Order updated successfully' });
    }
  });
});

module.exports = router;
