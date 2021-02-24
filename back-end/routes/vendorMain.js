'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const checkPermission = require('./checkPermission');

const queries = {
  getVendorInfo:
    'Select USER_ID, First_Name, Last_Name, Cart_ID, Location, Menu_ID, Available FROM users JOIN users_cart USING (User_ID) JOIN cart USING (cart_ID)WHERE user_ID = ?;'
};

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

// TODO: need to change the cart location to separate out lat and long
/**
 * Transforms database result array into JSON in desired format
 * @param {Array} dbResult results from database query
 */
function makeJSON(dbResult) {
  if (dbResult) {
    let obj = {
      vendorID: dbResult[0].User_ID,
      vendorFirstName: dbResult[0].First_Name,
      vendorLastName: dbResult[0].Last_Name,
      cart: {
        id: dbResult[0].Cart_ID,
        // FIXME: right here
        location: dbResult[0].Location,
        menuID: dbResult[0].Menu_ID,
        available: dbResult[0].available == 'Y' ? true : false
      }
    };
    return obj;
  }
}

module.exports = router;
