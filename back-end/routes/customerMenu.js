const express = require('express');
const router = express.Router();
// const mysql = require('mysql2');
const db = require('../database/connection');

router.put('/order', async(req, res, next) => {
  requestData = req.body;
  let cartID = requestData.cartID;

  //create new user ID
  let contactInfo = requestData.contact;
  let firstName = requestData.firstName;
  let lastName = requestData.lastName;
  let createNewUserQuery = 
    `
    INSERT INTO USERS(EMAIL, USERS.PASSWORD, FIRST_NAME, LAST_NAME, PERMISSION)
    VALUES	("${contactInfo}", "", "${firstName}", "${lastName}", "CUSTOMER")
    ;
    `
  let createNewUser = await db.promise().query(createNewUserQuery);

  // get new user ID 
  let getNewUserIDQuery = 
    `SELECT USER_ID FROM USERS
    ORDER BY USER_ID DESC
    LIMIT 1
    ;`
  let newUserID = (await db.promise().query(getNewUserIDQuery))[0][0].USER_ID;

  // create log entry 
  let createLogEntryQuery = 
    `
    INSERT INTO LOG(DATETIME, EVENT)
    VALUES (NOW(), "SUBMIT ORDER FROM WEB INTERFACE")
    ;
    `

    console.log(req.body);
  let addLogEntry = await db.promise().query(createLogEntryQuery)

  // get latest log event ID
  let getLatestLogEventQuery = 
    `SELECT LOG_ITEM_ID FROM LOG
    ORDER BY LOG_ITEM_ID DESC
    LIMIT 1
    ;`
  let latestLogID = (await db.promise().query(getLatestLogEventQuery))[0][0].LOG_ITEM_ID;

  // insert log event into user logs table
  let userLogsQuery = 
    `INSERT INTO USER_LOGS(USER_ID, LOG_ITEM_ID)
    VALUES (${newUserID}, ${latestLogID})
    ;
    `
  let userLogsEntry = await db.promise().query(userLogsQuery);

  //create new order in database
  let createOrderQuery = 
  `
  INSERT INTO ORDERS(DATE)
  VALUES 	(NOW())
  ;`

  // get latest ID query
  let getLatestOrderIDQuery = 
    `
    SELECT ORDER_ID FROM ORDERS
    ORDER BY ORDER_ID DESC
    LIMIT 1
    ;`
  

  let createOrder = await db.promise().query(createOrderQuery);
  let latestID = (await db.promise().query(getLatestOrderIDQuery))[0][0].ORDER_ID;

  // get maximum item ID in database
  let getLargestItemIDQuery = 
    `SELECT ITEM_ID FROM ITEMS
    ORDER BY ITEM_ID DESC
    LIMIT 1
    ;`
  let maxItemID = (await db.promise().query(getLargestItemIDQuery))[0][0].ITEM_ID;
  const itemsArray = []
  for(let i=1; i<=maxItemID; i++){
    itemsArray.push(i)
  }

  // add items to order
  for(const key in requestData){
    if(key === "order"){
      for(const value in requestData[key]){
        let itemid = parseInt(value);
        let quantity = requestData[key][value];
        if(itemsArray.includes(itemid) && quantity > 0){
          let addItemQuery = await 
          `INSERT INTO ORDERS_ITEMS
          (ORDER_ID, ITEM_ID, QUANTITY)
          VALUES 	
            (${latestID}, ${itemid}, ${quantity});
          `
          let addItem = await db.promise().query(addItemQuery);
        }
      }
    }
  }

  // add order to CART_ORDERS
  let addItemsCartQuery =
    `INSERT INTO CART_ORDERS(CART_ID, ORDER_ID, COMPLETE)
    VALUES	(${cartID}, ${latestID}, "N")
    ;`

  let cartOrders = await db.promise().query(addItemsCartQuery);

  // add order to ORDER_USERS
  let orderUsersQuery = 
    `INSERT INTO ORDER_USERS(USER_ID, ORDER_ID)
    VALUES  (${newUserID}, ${latestID})
    ;`
  let userOrders = await db.promise().query(orderUsersQuery);

  res.send("");


})

// customers/cartID route
router.get('/:cartID', (req, res, next) => {
  let cartID = req.params.cartID;
  let custCartQuery = `SELECT ITEM_ID, ITEM_NAME, DESCRIPTION_ITEM, PRICE
    FROM MENU 
    JOIN ITEMS_MENU USING (MENU_ID) 
    JOIN ITEMS USING (ITEM_ID) 
    JOIN CART USING (MENU_ID) 
    WHERE CART_ID = ${cartID} AND ITEMS_MENU.AVAILABLE ="Y";`;

  // querry database
  db.query(custCartQuery, (err, results, fields) => {
    if (err) throw err;
    let output = { data: results };
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(output);
  });
});

module.exports = router;
