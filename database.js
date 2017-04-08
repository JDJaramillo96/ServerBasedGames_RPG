//Dependencies
var pg = require('pg');

/*var config = {
  user: 'xkqkwwgl',
  database: 'xkqkwwgl',
  password: 'rrZyU3lQ-nrYFvMX3XNEXnGwXsLeUDtB',
  host: 'stampy.db.elephantsql.com',
  port: 5432,
  max: 50,
  idleTimeoutMillis: 30000
};*/

var pool = new pg.Pool();

//Query function
function query (sqlStatement, onCompleted) {
  pool.connect (function (error, client) {
    if (error) return console.error('Error fetching client from pool', error);

    client.query (sqlStatement, function (error, result) {
      if (error) return console.error('Error running query', error);

      onCompleted (result.rows);

      client.end (function (error) {
        if (error) return console.error('Error ending the client', error);
      });
    });
  });

  pool.on ('error', function (error, client) {
    console.error('Idle client error', error.message, error.stack);
  });
}

//Exporting module
module.exports.query = query;
