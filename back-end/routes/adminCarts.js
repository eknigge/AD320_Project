'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const checkPermission = require('./checkPermission');

const queries = {
  getAllCarts:
    'Select Cart_ID, Location, Available, User_ID, First_Name, Last_Name, menu_ID, menu_Title from cart JOIN users_cart USING (cart_id) JOIN Users USING (user_ID) JOIN Menu USING (menu_ID);',
};

router.get('/', async (req, res) => {
  let data = (await db.promise().execute(queries.getAllCarts))[0];
  res.json(data);
});

module.exports = router;
