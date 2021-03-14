'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const logger = require('../src/logging');

const queries = {
  getAllUsers: 'SELECT * FROM Users;',
};

router.get('/', async (req, res) => {
  try {
    let result = (await db.promise().execute(queries.getAllUsers))[0];
    res.json(result);
  } catch {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
