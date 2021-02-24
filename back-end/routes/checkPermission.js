checkPermission = async (id, role) => {
  let query = 'SELECT Permission FROM Users WHERE User_ID = ?';
  let db = require('../database/connection');
  try {
    let validPermission =
      (await db.promise().execute(query, [id]))[0][0]['Permission'] ===
      `${role}`;
    return validPermission;
  } catch {
    return false;
  }
};

module.exports = checkPermission;
