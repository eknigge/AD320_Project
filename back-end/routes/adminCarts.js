'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const checkPermission = require('./checkPermission');

const queries = {
  getAllCarts:
    'Select Cart_ID, Location, Available, User_ID, First_Name, Last_Name, menu_ID, menu_Title from cart JOIN users_cart USING (cart_id) JOIN Users USING (user_ID) JOIN Menu USING (menu_ID);',
  getCartByID:
    'SELECT * from Cart JOIN users_cart USING (cart_ID) WHERE cart_ID = ?;',
  getAllMenuID: 'SELECT menu_ID from menu;',
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

  // TODO: grab all vendor without carts assigned
  // write code here... vacantVendor

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
  };
  res.json(result);
});

router.get('/new', async (req, res) => {
  let menuIDs = (await db.promise().execute(queries.getAllMenuID))[0];
  let allMenus = menuIDs.map((menu) => menu.menu_ID);
  res.json({ allMenus });
});

module.exports = router;
