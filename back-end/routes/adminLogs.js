'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');

const queries = {
  getLogsByLatestTime:
    'SELECT LOG_ITEM_ID, USER_ID, FIRST_NAME, LAST_NAME, EVENT, UNIX_TIMESTAMP(DATETIME) AS EPOCH FROM log LEFT JOIN User_Logs USING (Log_Item_ID) LEFT JOIN Users USING(User_ID) ORDER BY DATETIME desc;',
};

router.get('/', async (req, res) => {
  const result = (await db.promise().execute(queries.getLogsByLatestTime))[0];
  res.send(result);
});

module.exports = router;
