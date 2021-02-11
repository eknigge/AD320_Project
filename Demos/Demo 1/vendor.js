const express = require('express');
const db = require('mysql2');
const login_info = require('./credentials.json');

const connection = db.createConnection(login_info);

connection.query(
    "select FIRST_NAME AS `First Name`, LAST_NAME AS `Last Name`, ITEM_NAME AS `Item`, PRICE, DATE FROM USERS JOIN ORDER_USERS USING (USER_ID) JOIN ORDERS USING (ORDER_ID) JOIN ORDERS_ITEMS USING (ORDER_ID) JOIN ITEMS USING (ITEM_ID) JOIN CART_ORDERS USING (ORDER_ID) JOIN CART USING (CART_ID) WHERE CART_ID = 1 ORDER BY DATE ;",
     (err, results, fields) => {
         console.log(results);
    }
);

connection.end();