'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');

const queries = {
  getAllMenus: 'SELECT * from menu;',
  getOnMenuItems:
    'SELECT Item_ID, Menu_ID, Available, Item_Name, Price, Item_Category, Description_Item from items_menu JOIN Items USING (Item_ID) WHERE Menu_ID = ?;',
  getOffMenuItems:
    'SELECT Item_ID, Item_Name, Item_Category FROM Items WHERE Item_ID NOT IN (SELECT Item_ID FROM Items_Menu WHERE Menu_ID = ?);',
  getMenuInfo: 'SELECT * FROM Menu WHERE Menu_ID = ?;',
};

router.get('/', async (req, res) => {
  const result = (await db.promise().execute(queries.getAllMenus))[0];
  res.send(result);
});

router.get('/edit/:id', async (req, res) => {
  const menuID = req.params.id;
  const onMenu = (
    await db.promise().execute(queries.getOnMenuItems, [menuID])
  )[0];
  const offMenu = (
    await db.promise().execute(queries.getOffMenuItems, [menuID])
  )[0];
  const menuInfo = (
    await db.promise().execute(queries.getMenuInfo, [menuID])
  )[0][0];

  let finalJSON = { onMenu, offMenu, menuInfo };
  res.send(finalJSON);
});

module.exports = router;
