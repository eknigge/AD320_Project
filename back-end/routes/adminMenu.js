'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const logger = require('../src/logging');

const queries = {
  getAllMenus: 'SELECT * from menu;',
  getOnMenuItems:
    'SELECT Item_ID, Menu_ID, Available, Item_Name, Price, Item_Category, Description_Item from items_menu JOIN Items USING (Item_ID) WHERE Menu_ID = ?;',
  getOffMenuItems:
    'SELECT Item_ID, Item_Name, Item_Category FROM Items WHERE Item_ID NOT IN (SELECT Item_ID FROM Items_Menu WHERE Menu_ID = ?);',
  getMenuInfo: 'SELECT * FROM Menu WHERE Menu_ID = ?;',
  updateMenuInfo:
    'UPDATE Menu SET Description_Menu = ?, Menu_Title = ? WHERE Menu_ID = ?;',
  addMenuItem: 'INSERT INTO Items_Menu VALUES (?, ?, "Y")',
  removeMenuItem: 'DELETE FROM Items_Menu WHERE MENU_ID = ? AND Item_ID = ?;',
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

router.put('/edit/:menuID', async (req, res) => {
  try {
    const { menuID, addItems, removeItems, title, description } = req.body;
    await db
      .promise()
      .execute(queries.updateMenuInfo, [description, title, menuID]);

    if (addItems.length > 0) {
      addItems.map(
        async (item) =>
          await db.promise().execute(queries.addMenuItem, [item, menuID])
      );
      logger(1, `Admin added ${addItems.length} items to menu ${menuID}`);
    }

    if (removeItems.length > 0) {
      removeItems.map(
        async (item) =>
          await db.promise().execute(queries.removeMenuItem, [menuID, item])
      );
      logger(
        1,
        `Admin removed ${removeItems.length} items from menu ${menuID}`
      );
    }
    res.send('Update Successful!');
  } catch {
    res.status(400).send('Something went wrong.');
  }
});

module.exports = router;
