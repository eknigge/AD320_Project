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
  let formattedJSON = makeJSON(dbResult);
  res.json({ cart: formattedJSON });
});

function makeJSON(dbResult) {
  return dbResult.map((cart) => {
    let locArr = cart.Location.split(',');
    let item = {
      Cart_ID: cart.Cart_ID,
      First_Name: cart.First_Name,
      Last_Name: cart.Last_Name,
      Menu_ID: cart.Menu_ID,
      Available: cart.Available === 'Y' ? true : false,
      lat: parseFloat(locArr[0]),
      lng: parseFloat(locArr[1])
    };
    return item;
  });
}

module.exports = router;
