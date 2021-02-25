let express = require('express');
let router = express.Router();
const mysql = require('mysql2');

// get credentials 
let credentials = require('../credentials.json')

//create database connection
const connection = mysql.createConnection(credentials);

// vendor/orders/cartID
router.get('/:cartID', (req, res, next) => {
  let cartID = req.params.cartID;
  let custCartQuery = 
    `
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
    ;`

    // querry database
  connection.query(custCartQuery, (err, results, fields)=>{
    if (err) throw err;
    let output = {"data": results}
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(output);
  })
});


module.exports = router;
