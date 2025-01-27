const mysql = require('mysql2');
const fs = require('fs');
const csv = require('fast-csv');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ze31415uu',
    database: 'shop_db'
});

const query = 'SELECT * FROM orders';
connection.query(query, (err, results) => {
    if (err) throw err;

    const ws = fs.createWriteStream('orders.csv');
    csv.write(results, { headers: true }).pipe(ws);

    console.log('資料已匯出到 orders.csv');
    connection.end();
});
