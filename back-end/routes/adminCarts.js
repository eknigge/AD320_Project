'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const logger = require('../src/logging');

const queries = {
  getAllCarts:
    'Select Cart_ID, Location, Available, User_ID, First_Name, Last_Name, menu_ID, menu_Title from cart LEFT JOIN users_cart USING (cart_id) LEFT JOIN Users USING (user_ID) LEFT JOIN Menu USING (menu_ID);',
  getCartByID:
    'SELECT * from Cart LEFT JOIN users_cart USING (cart_ID) WHERE cart_ID = ?;',
  getAllMenuID: 'SELECT menu_ID from menu;',
  updateCart:
    'UPDATE Cart SET Location = ?, Menu_ID = ?, Available =? WHERE Cart_ID = ?;',
  createNewCart: 'INSERT INTO cart VALUES (null, ?, ?, ?);',
  getVacantVendors:
    'SELECT User_ID, First_Name, Last_Name FROM users LEFT JOIN Users_Cart USING (User_ID) WHERE (Permission = "VENDOR" AND Cart_ID IS NULL) OR User_ID = ?;',
  checkCartOccupancy: 'SELECT * FROM Users_Cart WHERE Cart_ID = ?;',
  updateUsersCart: 'UPDATE Users_Cart SET User_ID = ? WHERE Cart_ID = ?;',
  insertUsersCart: 'INSERT INTO Users_Cart VALUE (?, ?);',
  unbindVendor: 'DELETE FROM Users_Cart WHERE Cart_ID = ?;',
};

router.get('/', async (req, res) => {
  let data = (await db.promise().execute(queries.getAllCarts))[0];
  res.json(data);
});

router.get('/edit/:cartID', async (req, res) => {
  let cartID = parseInt(req.params.cartID);
  let data = (await db.promise().execute(queries.getCartByID, [cartID]))[0][0];
  // grab all available menus
  let menuIDs = (await db.promise().execute(queries.getAllMenuID))[0];
  let allMenus = menuIDs.map((menu) => menu.menu_ID);
  let vacantVendors = (
    await db.promise().execute(queries.getVacantVendors, [data.USER_ID])
  )[0];

  let locArr = data.LOCATION.split(',');
  let lat = locArr[0];
  let lng = locArr[1];
  let result = {
    cartID: data.CART_ID,
    lat: lat,
    lng: lng,
    menuID: data.MENU_ID,
    status: data.AVAILABLE === 'Y',
    vendorID: data.USER_ID,
    allMenus: allMenus,
    vendors: vacantVendors,
  };
  res.json(result);
});

router.get('/new', async (req, res) => {
  let menuIDs = (await db.promise().execute(queries.getAllMenuID))[0];
  let allMenus = menuIDs.map((menu) => menu.menu_ID);
  let vacantVendors = (
    await db.promise().execute(queries.getVacantVendors, [0])
  )[0];
  res.json({ allMenus, vendors: vacantVendors });
});

router.put('/edit/:cartID', async (req, res) => {
  try {
    const { cartID, lat, lng, menuID, vendorID, status } = req.body;
    const location = `${lat},${lng}`;
    const available = status ? 'Y' : 'N';
    const result = (
      await db
        .promise()
        .execute(queries.updateCart, [location, menuID, available, cartID])
    )[0];
    logger(1, `Admin updated cart ID ${cartID}`);

    assignVendor(vendorID, cartID);

    res.send(`Update successful for Cart ID ${cartID}`);
  } catch {
    res.status(400).send('Update failed.');
  }
});

router.post('/new', async (req, res) => {
  try {
    const { lat, lng, menuID, vendorID, status } = req.body;
    const location = `${lat},${lng}`;
    const available = status ? 'Y' : 'N';
    const result = (
      await db
        .promise()
        .execute(queries.createNewCart, [location, parseInt(menuID), available])
    )[0];
    logger(1, `Admin created a new cart ID ${result.insertId}`);
    assignVendor(vendorID, result.insertId);
    res.send(`Successfully created new cart ID ${result.insertId}`);
  } catch {
    res.status(400).send('Something went wrong.');
  }
});

async function assignVendor(vendorID, cartID) {
  if (!isNaN(parseInt(vendorID))) {
    const occ = (
      await db.promise().execute(queries.checkCartOccupancy, [cartID])
    )[0];
    if (occ.length > 0) {
      // update users_cart
      await db
        .promise()
        .execute(queries.updateUsersCart, [parseInt(vendorID), cartID]);
      logger(1, `Admin assigned vendor ${vendorID} to cart ${cartID}`);
    } else if (occ.length === 0) {
      // insert users_cart
      await db
        .promise()
        .execute(queries.insertUsersCart, [parseInt(vendorID), cartID]);
      logger(1, `Admin assigned vendor ${vendorID} to cart ${cartID}`);
    }
  } else if (vendorID === 'remove') {
    // remove row from users_cart
    await db.promise().execute(queries.unbindVendor, [cartID]);
    logger(1, `Admin removed all vendors from cart ${cartID}`);
  }
}

module.exports = router;
