// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const registerRoutes = require('./routes/register');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const resetPasswordRouter = require('./routes/resetPasswordRouter');
const propertyStaffListRouter = require('./routes/propertyStaffList');
const staffRouter = require('./routes/staff');
const ordersRouter = require('./routes/orders');
const orderControllerRouter = require('./routes/orderController');
const commentsRouter = require('./routes/comments');

const adminRouter = require('./routes/admin'); 
const adminUsersRouter = require('./routes/admin-users');
const adminStaffRouter = require('./routes/admin-staff'); 
const adminOrdersRouter = require('./routes/admin-orders');
const adminCommentsRouter = require('./routes/admin-comments');

const app = express();
app.use(cors());
// 允许解析请求体中的 JSON 数据
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 注册路由
app.use('/register', registerRoutes);
// 使用 login 路由
app.use('/login', loginRouter);
// 使用重置密码路由
app.use('/reset-password', resetPasswordRouter);
// 使用 users 路由
app.use('/users', usersRouter);
// 使用物业人员信息路由
app.use('/propertyStaffList', propertyStaffListRouter);
// 使用物业人员名单路由
app.use('/staff', staffRouter);
// 添加订单和物业人员路由
app.use('/orders', ordersRouter);
// 使用订单控制器路由
app.use('/api/orders', orderControllerRouter);
// 使用评论路由模块
app.use('/comments', commentsRouter);
// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 将 admin 路由添加到 Express 应用中
app.use('/admin', adminRouter);
//使用用户路由
app.use('/admin/users', adminUsersRouter);
// 将物业人员管理路由添加到 Express 应用中
app.use('/admin', adminStaffRouter);
// 使用订单管理路由
app.use('/admin', adminOrdersRouter);
// 使用评论管理路由
app.use('/admin', adminCommentsRouter); 

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
