'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const checkPermission = require('./checkPermission');

// SQL queries
const queries = {
  getMenu:
    'SELECT User_ID, First_Name, Last_Name, Cart_ID, Menu_ID, Item_ID, Item_Name, Item_Category, Price, Items_Menu.Available FROM Users JOIN Users_Cart USING (user_ID) JOIN Cart USING (cart_ID) JOIN Menu USING (menu_ID) JOIN Items_Menu USING (menu_ID) JOIN Items USING (item_ID) WHERE User_ID = ?',
  userPermission: 'SELECT Permission FROM Users WHERE User_ID = ?',
  updateMenuItem:
    'UPDATE Items_Menu SET Available = ? WHERE Menu_ID = ? AND Item_ID = ?'
};

/**
 * Shows the menu for a specific vendor
 */
router.get('/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let validPermission;
  try {
    validPermission = checkPermission(id, 'VENDOR');

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

/**
 * Updates an item's availability in the database
 */
router.put('/', async (req, res) => {
  try {
    const { menuID, id, status } = req.body;
    let available = status ? 'Y' : 'N';

    if (Array.isArray(id)) {
      let queryStr = `UPDATE Items_Menu SET Available = '${available}' WHERE Menu_ID = ${menuID} AND Item_ID IN (${id.toString()})`;
      await db.promise().execute(queryStr);
    } else {
      await db
        .promise()
        .execute(queries.updateMenuItem, [available, menuID, id]);
    }
    res.status(204).send('Update successful');
  } catch {
    res.status(400).send('Bad request');
  }
});

/**
 * Turns query result into JSON responded by API
 * @param {Array} dbResult array containing query result
 */
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

/**
 * Format all items into JSON
 * @param {Array} dbResult array containing query result
 */
function getItems(dbResult) {
  return dbResult.map(getItem);
}

/**
 * Used by map to format each item's information
 * @param {Object} row json containing item information
 */
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

module.exports = router;
