const express = require('express');
const db = require('mysql2');
const login_info = require('./credentials.json');

const connection = db.createConnection(login_info);

connection.query(
    "SELECT * FROM MENU JOIN ITEMS_MENU USING (MENU_ID) JOIN ITEMS USING (ITEM_ID) WHERE MENU_ID = 1 ORDER BY MENU_ID;",
     (err, results, fields) => {
         console.log(results);
    }
);

connection.end();