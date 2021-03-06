'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');

const queries = {
  getAllCart:
    'SELECT Cart_ID, First_Name, Last_Name, Menu_ID, Available, Location FROM Cart JOIN users_cart USING (cart_ID) JOIN users USING (user_id);'
};

router.get('/', async (req, res) => {
  let dbResult = (await db.promise().execute(queries.getAllCart))[0];
  console.log(dbResult);
  res.status(200);
});

// TODO: format the location to lat/lng, available to boolean
function makeJSON(dbResult) {
  let obj = {
    lat: 49.3434,
    lng: -122.4343
  };
}

module.exports = router;
