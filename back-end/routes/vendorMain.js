'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const checkPermission = require('./checkPermission');

// SQL queries
const queries = {
  getVendorInfo:
    'Select USER_ID, First_Name, Last_Name, Cart_ID, Location, Menu_ID, Available FROM users JOIN users_cart USING (User_ID) JOIN cart USING (cart_ID)WHERE user_ID = ?;',
  updateCartStatus: 'UPDATE Cart SET AVAILABLE = ? WHERE Cart_ID = ?;',
  updateCartLocation: 'UPDATE Cart SET location = ? WHERE cart_ID = ?;',
  getAllVendorInfo:
    'SELECT USER_ID, First_Name, Last_Name FROM users WHERE permission = "VENDOR";'
};

/**
 * Used by vendor main to get it's cart location, menu_ID, and cart_ID
 */
router.get('/:id', async (req, res) => {
  let id = req.params.id;
  let validPermission;
  try {
    validPermission = checkPermission(id, 'VENDOR');

    if (validPermission) {
      // query db for vendor info
      const data = (await db.promise().execute(queries.getVendorInfo, [id]))[0];
      let finalJSON = makeJSON(data);
      res.json(finalJSON);
    }
  } catch {
    res.status(400).send({ error: `No user found with id ${id}` });
  }
});

/**
 * Used by vendor main to update cart's location and status
 */
router.put('/:id', async (req, res) => {
  let id = req.params.id;
  const { reqType, cartID } = req.body;
  let validPermission;
  try {
    validPermission = checkPermission(id, 'VENDOR');
    if (validPermission) {
      if (reqType === 'status') {
        const { status } = req.body;
        await db
          .promise()
          .execute(queries.updateCartStatus, [status ? 'Y' : 'N', cartID]);
      } else if (reqType === 'location') {
        const { newLocation } = req.body;
        await db
          .promise()
          .execute(queries.updateCartLocation, [newLocation, cartID]);
      }
    }
    res.status(200).send('Update successful');
  } catch {
    res.status(400).send({ error: `No user found with id ${id}` });
  }
});

/**
 * Used by vendor punch card to get a list of all vendor's ID and names
 */
router.get('/', async (req, res) => {
  res.json((await db.promise().execute(queries.getAllVendorInfo))[0]);
});

/**
 * Transforms database result array into JSON in desired format
 * @param {Array} dbResult results from database query
 */
function makeJSON(dbResult) {
  if (dbResult) {
    let locArr = dbResult[0].Location.split(',');
    let obj = {
      vendorID: dbResult[0].USER_ID,
      vendorFirstName: dbResult[0].First_Name,
      vendorLastName: dbResult[0].Last_Name,
      cart: [
        {
          id: dbResult[0].Cart_ID,
          lat: parseFloat(locArr[0]),
          lng: parseFloat(locArr[1]),
          menuID: dbResult[0].Menu_ID,
          available: dbResult[0].Available === 'Y' ? true : false
        }
      ]
    };
    return obj;
  }
}

module.exports = router;
