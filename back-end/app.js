// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'mydb',
});

connection.query(
  'SELECT * FROM MENU JOIN ITEMS_MENU USING (MENU_ID) JOIN ITEMS USING (ITEM_ID) ORDER BY MENU_ID;',
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
  }
);
