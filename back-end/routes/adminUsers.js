'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const logger = require('../src/logging');

const queries = {
  getAllUsers:
    'SELECT User_ID, First_Name, Last_Name, Permission, Email FROM Users;',
  getUserById:
    'SELECT User_ID, First_Name, Last_Name, Permission, Email FROM Users WHERE User_ID = ?;',
  updateUserById:
    'UPDATE Users SET First_Name = ?, Last_Name = ?, Permission = ?, Email = ? WHERE User_ID = ?;',
  createNewUser: "INSERT INTO Users VALUES (NULL, ?, '', ?, ?, ?);",
};

router.get('/', async (req, res) => {
  try {
    let result = (await db.promise().execute(queries.getAllUsers))[0];
    res.json(result);
  } catch {
    res.status(500).send('Server Error');
  }
});

router.get('/edit/:userId', async (req, res) => {
  try {
    let userId = parseInt(req.params.userId);
    let result = (
      await db.promise().execute(queries.getUserById, [userId])
    )[0][0];
    res.json(result);
  } catch {
    res.status(500).send('Server Error');
  }
});

router.put('/edit/:cartID', async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, role, userId } = req.body;
  let result = await db
    .promise()
    .execute(queries.updateUserById, [
      firstName,
      lastName,
      role,
      email,
      userId,
    ]);
  logger(1, `Admin edited info on user ID ${userId}: ${firstName} ${lastName}`);
  res.send(`Update successful for User ID ${userId}`);
});

router.post('/new', async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body;
    const result = (
      await db
        .promise()
        .execute(queries.createNewUser, [email, firstName, lastName, role])
    )[0];
    logger(
      1,
      `Admin created a new user ID ${result.insertId}: ${firstName} ${lastName}`
    );
    res.send(`Successfully created new user ID ${result.insertId}`);
  } catch {
    res.status(400).send('Something went wrong.');
  }
});

module.exports = router;
