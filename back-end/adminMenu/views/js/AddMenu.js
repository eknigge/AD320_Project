const express = require('express');
let mysql = require('mysql2')
const router = express.Router();
let dbCreds = require('../../../database/connection')

const connection = getConnection();
connection.connect;

//Connect to DB
function getConnection(){
  return mysql.createConnection(dbCreds)
}

  router.post('/menu_update', function(req, res){

    const item = req.body.item;
    const category = req.body.category;
    const price = req.body.price;   
    const desc = req.body.desc;   
    const itemID = req.body.itemID; 
    const menuID = req.body.menuID;     
    const avai = req.body.avai; 
    
    const queryString = 'SELECT ITEM_ID, ITEM_NAME, ITEM_CATEGORY, PRICE, DESCRIPTION_ITEM, MENU_ID, AVAILABLE from mydb.ITEMS JOIN ITEMS_MENU USING (ITEM_ID) WHERE ITEM_NAME = "' + item +'"';

    connection.query(queryString, function (err, result) {
      if(err){
        console.log(err);
        res.sendStatus(500);
        res.end
      }
      if(result.length  > 0) {
        console.log(item.length)
        res.send('"' + item + '"'  + " already exists.");
      }
      else {

       let query1 = 'INSERT INTO ITEMS(ITEM_NAME, ITEM_CATEGORY, PRICE, DESCRIPTION_ITEM) VALUES (?, ?, ?, ?);'
       getConnection().query(query1, [item, category, price, desc], (err, results, fields) => { 
         if(err){
           console.log("Failed to insert new menu items " + err)
           res.sendStatus(500)
           return
          }else {
            let id = results.insertId;
           
            let query2 = 'INSERT INTO ITEMS_MENU(ITEM_ID, MENU_ID, AVAILABLE) VALUES (?, ?, ?);'
            getConnection().query(query2, [id, menuID, avai], (err, results, fields,) => {
              if(err){
                console.log("Second fail " + err)
                res.sendStatus(500)
              }else{
                res.send('A new menu item, "' + item +'," is added.')

              }  //last else
            })  //query2 
          }    //second else
        });   //query1
      }      //first else
    });     //getConnection() function
  });      //Post function

  module.exports = router;



  




