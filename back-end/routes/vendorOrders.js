const express = require('express');
const router = express.Router();
// const mysql = require('mysql2');
const db = require('../database/connection');

// get credentials
// let credentials = require('../credentials.json')

//create database connection
// const connection = mysql.createConnection(credentials);

// vendor/orders/complete/orderID
router.post('/complete/:orderID', (req, res, next) => {
  let orderID = req.params.orderID;
  let completeOrderQuery = `
    UPDATE CART_ORDERS
    SET COMPLETE = "Y"
    WHERE ORDER_ID = ${orderID}; 
  `;

  // query database for cart orders
  db.query(completeOrderQuery, (err, results, fields) => {
    if (err) throw err;
    res.send('success');
  });
});

// vendor/orders/cartID
router.get('/:cartID', (req, res, next) => {
  let cartID = req.params.cartID;
  let custCartQuery = `
    SELECT DATE, ORDER_ID, FIRST_NAME, LAST_NAME, ITEM_NAME, PRICE, QUANTITY
    FROM ORDERS
    JOIN CART_ORDERS USING (ORDER_ID)
    JOIN CART USING (CART_ID)
    JOIN ORDERS_ITEMS USING (ORDER_ID)
    JOIN ITEMS USING (ITEM_ID)
    JOIN ORDER_USERS USING (ORDER_ID)
    JOIN USERS USING (USER_ID)
    WHERE COMPLETE = "N" AND CART_ID = ${cartID}
    ORDER BY DATE
    ;`;

  // query database for cart orders
  db.query(custCartQuery, (err, results, fields) => {
    if (err) throw err;
    let output = { data: results };
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(output);
  });
});

// vendor/orders/cartID/subtotal
router.get('/:cartID/subtotal', (req, res, next) => {
  let cartID = req.params.cartID;
  // query
  let createView = `
    CREATE VIEW ORDER_SUMMARY AS
    SELECT DATE, ORDER_ID, FIRST_NAME, LAST_NAME, ITEM_NAME, PRICE, QUANTITY, (PRICE*QUANTITY) AS ITEM_TOTAL
    FROM ORDERS
    JOIN CART_ORDERS USING (ORDER_ID)
    JOIN CART USING (CART_ID)
    JOIN ORDERS_ITEMS USING (ORDER_ID)
    JOIN ITEMS USING (ITEM_ID)
    JOIN ORDER_USERS USING (ORDER_ID)
    JOIN USERS USING (USER_ID)
    WHERE COMPLETE = "N" AND CART_ID = ${cartID}
    ORDER BY DATE
    ; 
  `;

  let subTotal = `
    SELECT ORDER_ID, SUM(ITEM_TOTAL) AS TOTAL
    FROM ORDER_SUMMARY
    GROUP BY ORDER_ID 
    ; 
  `;

  let dropOldTable = `
   DROP VIEW 
   IF EXISTS ORDER_SUMMARY; 
   `;
  // drop old tables
  db.query(dropOldTable, (err, results, fields) => {
    if (err) throw err;
  });

  // creat view in database
  db.query(createView, (err, results, fields) => {
    if (err) throw err;
    // query data view for subtotals
    db.query(subTotal, (err, results, fields) => {
      if (err) throw err;
      let output = { data: results };
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(output);
    });
  });
});

module.exports = router;
