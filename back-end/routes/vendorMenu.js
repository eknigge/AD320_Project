'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', async (req, res) => {
  let id = parseInt(req.query.id);
  console.log('Getting menu for vendor ' + id);
  let queryString =
    'SELECT User_ID, Cart_ID, Menu_ID, Item_ID, Item_Name, Item_Category, Price, Items_Menu.Available, Items.Description FROM Users JOIN Users_Cart USING (user_ID) JOIN Cart USING (cart_ID) JOIN Menu USING (menu_ID) JOIN Items_Menu USING (menu_ID) JOIN Items USING (item_ID) WHERE User_ID = ?';

  const data = (await db.promise().execute(queryString, [id]))[0];

  let finalJSON = makeJSON(data);
  res.json(finalJSON);
});

function makeJSON(dbResult) {
  if (dbResult) {
    let obj = {
      vendorID: dbResult[0].User_ID,
      cartID: dbResult[0].Cart_ID,
      menu: {
        menuID: dbResult[0].Menu_ID,
        items: getItems(dbResult)
      }
    };
    return obj;
  }
}

function getItem(row) {
  let item = {
    id: row.Item_ID,
    name: row.Item_Name,
    category: row.Item_Category,
    price: row.Price / 100,
    available: row.Available === 'Y'
  };
  return item;
}

function getItems(dbResult) {
  return dbResult.map(getItem);
}

module.exports = router;
