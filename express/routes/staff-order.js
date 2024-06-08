const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const db = require('../config/db');

// 使用 method-override 中间件来处理 PUT 请求
router.use(methodOverride('_method'));

// 更新订单状态路由
router.put('/orders/:orderId/update', (req, res) => {
  const orderId = req.params.orderId;
  const completed = req.body.completed;

  // 更新订单状态
  db.query('UPDATE orders SET completed = ? WHERE id = ?', [completed, orderId], (err, result) => {
    if (err) {
      console.error('Error updating order:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Order updated successfully' });
    }
  });
});

// 获取并渲染订单页面
router.get('/orders', (req, res) => {
  if (req.session.user) {
    const user = req.session.user;
    const staffName = user.name;

    // 查询该物业人员相关的订单数据
    db.query('SELECT * FROM orders WHERE staff = ?', [staffName], (err, orders) => {
      if (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.render('work/order', { user, orders });
      }
    });
  } else {
    res.redirect('/staff/login');
  }
});

module.exports = router;
