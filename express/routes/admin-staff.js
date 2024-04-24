const express = require('express');
const router = express.Router();
const cors = require('cors'); // 引入cors中间件
const db = require('../config/db');

// 使用cors中间件，允许所有来源的请求
router.use(cors());

// 获取所有物业人员信息
router.get('/staffs', (req, res) => {
    db.query('SELECT id, name, phone, email, address FROM proinfo', (err, results) => {
        if (err) {
            console.error('Error fetching staffs:', err);
            res.status(500).json({ error: 'Error fetching staffs' });
        } else {
            res.json(results);
        }
    });
});

// 创建新的物业人员信息
router.post('/staffs', (req, res) => {
    const { name, phone, email, address } = req.body;
    if (!name || !phone || !email || !address) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }
    db.query('INSERT INTO proinfo (name, phone, email, address) VALUES (?, ?, ?, ?)', [name, phone, email, address], (err, result) => {
        if (err) {
            console.error('Error creating staff:', err);
            res.status(500).json({ error: 'Error creating staff' });
        } else {
            res.json({ message: 'Staff created successfully' });
        }
    });
});

// 获取特定ID的物业人员信息
router.get('/staffs/:id', (req, res) => {
    const staffId = req.params.id;
    db.query('SELECT id, name, phone, email, address FROM proinfo WHERE id = ?', staffId, (err, result) => {
        if (err) {
            console.error('Error fetching staff:', err);
            res.status(500).json({ error: 'Error fetching staff' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'Staff not found' });
            } else {
                res.json(result[0]);
            }
        }
    });
});

// 更新特定ID的物业人员信息
router.put('/staffs/:id', (req, res) => {
    const staffId = req.params.id;
    const { name, phone, email, address } = req.body;
    if (!name || !phone || !email || !address) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }
    db.query('UPDATE proinfo SET name = ?, phone = ?, email = ?, address = ? WHERE id = ?', [name, phone, email, address, staffId], (err, result) => {
        if (err) {
            console.error('Error updating staff:', err);
            res.status(500).json({ error: 'Error updating staff' });
        } else {
            res.json({ message: 'Staff updated successfully' });
        }
    });
});

// 删除特定ID的物业人员信息
router.delete('/staffs/:id', (req, res) => {
    const staffId = req.params.id;
    db.query('DELETE FROM proinfo WHERE id = ?', staffId, (err, result) => {
        if (err) {
            console.error('Error deleting staff:', err);
            res.status(500).json({ error: 'Error deleting staff' });
        } else {
            res.json({ message: 'Staff deleted successfully' });
        }
    });
});

module.exports = router;
