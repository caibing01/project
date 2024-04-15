const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // 更改为您的 MySQL 用户名
    password: 'root', // 更改为您的 MySQL 密码
    database: 'system' // 更改为您的数据库名
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

module.exports = db;
