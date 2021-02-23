let dbFunction = {

  queryDb: async function (queryText, connection){
      return await connection.promise().query(`${queryText}`).then((results) =>{
          console.log(results[0]);
          return results;
      })
    }
}


module.exports.dbFunction = dbFunction;