const express = require('express');
const router = express.Router();
// const mysql = require('mysql2');
const db = require('../database/connection');

router.put('/order', async(req, res, next) => {
  tempdata = req.body;
  //need to import cart data
  let cartID = tempdata.cartID;
  let userID;

  //if not user ID use anonmyous order
  if(tempdata.userID) userID = tempdata.userID
  else  userID = 2;

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
  for(const key in tempdata){
    if(key === "order"){
      for(const value in tempdata[key]){
        let itemid = parseInt(value);
        let quantity = tempdata[key][value];
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
    VALUES  (${userID}, ${latestID})
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

// customers/ route
// router.get('/', (req, res, next) => {
//   let text = 'select * from MENU;';
//   res.send('this will be a map of all carts');
// });

module.exports = router;
