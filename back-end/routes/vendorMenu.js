'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');

const queries = {
  getMenu:
    'SELECT User_ID, First_Name, Last_Name, Cart_ID, Menu_ID, Item_ID, Item_Name, Item_Category, Price, Items_Menu.Available, Items.Description FROM Users JOIN Users_Cart USING (user_ID) JOIN Cart USING (cart_ID) JOIN Menu USING (menu_ID) JOIN Items_Menu USING (menu_ID) JOIN Items USING (item_ID) WHERE User_ID = ?',
  userPermission: 'SELECT Permission FROM Users WHERE User_ID = ?',
  updateMenuItem:
    'UPDATE Items_Menu SET Available = ? WHERE Menu_ID = ? AND Item_ID = ?;'
};

router.get('/', async (req, res) => {
  let id = parseInt(req.query.id);
  let validPermission;
  try {
    validPermission =
      (await db.promise().execute(queries.userPermission, [id]))[0][0][
        'Permission'
      ] === 'VENDOR';

    if (validPermission) {
      try {
        const data = (await db.promise().execute(queries.getMenu, [id]))[0];

        let finalJSON = makeJSON(data);
        res.json(finalJSON);
      } catch {
        res.status(400).send({
          error: 'You currently do not have an active menu'
        });
      }
    } else {
      res
        .status(401)
        .send({ error: 'You do not have permission to view this page' });
    }
  } catch {
    res.status(400).send({ error: `No user found with id ${id}` });
  }
});

function makeJSON(dbResult) {
  if (dbResult) {
    let obj = {
      vendorID: dbResult[0].User_ID,
      vendorFirstName: dbResult[0].First_Name,
      vendorLastName: dbResult[0].Last_Name,
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
