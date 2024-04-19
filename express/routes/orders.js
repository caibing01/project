// routes/orders.js
const express = require('express');
const router = express.Router();
const connection = require('../config/db');


// 获取所有订单
router.get('/', (req, res) => {
    connection.query('SELECT * FROM orders', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(results);
        }
    });
});

// 创建新订单
router.post('/submit', (req, res) => {
  const { username, datetime, category, staff } = req.body;
  const submissionTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // 获取当前时间

  const query = 'INSERT INTO orders (username, datetime, category, staff, submission_time) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [username, datetime, category, staff, submissionTime], (error, results) => {
    if (error) {
      console.error('Error making appointment:', error);
      res.status(500).send('Internal server error');
    } else {
      res.status(201).send('Appointment made successfully');
    }
  });
});

// 设置订单完成
router.put('/:orderId/complete', (req, res) => {
  const orderId = req.params.orderId;
  pool.query('UPDATE orders SET completed = 1 WHERE id = ?', orderId, (err, results) => {
    if (err) {
      console.error('Error completing order:', err);
      res.status(500).json({ success: false, message: 'Error completing order' });
    } else {
      res.json({ success: true, message: 'Order completed successfully' });
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
    connection.query('UPDATE orders SET category = ?, staff = ? WHERE id = ?', [category, staff, orderId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Order updated successfully' });
        }
    });
});

module.exports = router;
