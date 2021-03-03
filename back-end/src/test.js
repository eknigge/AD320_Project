var express = require('express');
var app = express();

// get the client
const mysql = require('mysql2');

// get credentials
let credentials = require('../credentials.json')

// create the connection to database
const connection = mysql.createConnection(credentials);

//import query db
let db = require('./queryDb');
console.log(db);

connection.connect();
db.dbFunction.queryDb('select * from menu;', connection).then( (result) => {
    connection.end();
    console.log(result);
});