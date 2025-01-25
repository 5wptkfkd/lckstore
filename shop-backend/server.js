const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 建立 MySQL 資料庫連線
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // 你的 MySQL 用戶名
    password: 'ze31415uu', // 你的 MySQL 密碼
    database: 'shop_db' // 資料庫名稱
});

// 連接資料庫
db.connect(err => {
    if (err) {
        console.error('無法連接到資料庫:', err);
        return;
    }
    console.log('成功連接到 MySQL 資料庫');
});

// API：接收訂單資料
app.post('/api/orders', (req, res) => {
    const { nickname, items } = req.body;

    if (!nickname || !items || items.length === 0) {
        return res.status(400).json({ message: '訂單資料不完整' });
    }

    // 計算總金額
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // 插入訂單主表
    const orderQuery = 'INSERT INTO orders (nickname, total_price) VALUES (?, ?)';
    db.query(orderQuery, [nickname, totalPrice], (err, result) => {
        if (err) {
            console.error('插入訂單主表時出錯:', err);
            return res.status(500).json({ message: '無法儲存訂單' });
        }

        const orderId = result.insertId;

        // 插入訂單詳細表
        const orderItemsQuery = 'INSERT INTO order_items (order_id, product_name, price, quantity) VALUES ?';
        const orderItemsData = items.map(item => [orderId, item.name, item.price, item.quantity]);

        db.query(orderItemsQuery, [orderItemsData], (err) => {
            if (err) {
                console.error('插入訂單詳細表時出錯:', err);
                return res.status(500).json({ message: '無法儲存訂單詳細' });
            }

            res.status(200).json({ message: '訂單已成功送出' });
        });
    });
});

// 啟動伺服器
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`伺服器運行於 http://localhost:${PORT}`);
});
