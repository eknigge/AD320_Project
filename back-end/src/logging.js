const db = require('../database/connection');

const queries = {
  createLog: 'INSERT INTO Log VALUE (NULL, ?, ?);',
  createUserLog: 'INSERT INTO User_Logs VALUES (?, ?);',
};

/**
 * Inserts an entry into the Logs table
 * @param {*} userID User ID of whoever performed the action
 * @param {*} logText String that describes the event
 * @returns the ID of the last insertion of the log
 */
const logger = async function createLogEvent(userID, logText) {
  // utility function to convert JS Date to MySQL DATETIME
  let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let result = (
    await db.promise().execute(queries.createLog, [date, logText])
  )[0];
  let logId = await result.insertId;
  let userLog = (
    await db.promise().execute(queries.createUserLog, [userID, logId])
  )[0];
  return logId;
};

module.exports = logger;
