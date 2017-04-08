//Dependencies & Modules
var express = require('express');
var router = express.Router();
var database = require('./../database.js');
var bodyParser = require('body-parser');

var query = '';

//## Battle services [/battle/{winnerID}/{losserID}]

//### Report battle [POST]
router.post('/:winnerID/:losserID', function(request, response) {
  var winnerID = request.params.winnerID;
  var losserID = request.params.losserID;
  //Body elements
  var pointsForWinner = request.body.pointsForWinner;
  var pointsForLosser = request.body.pointsForLosser;

  //Response
  query = 'SELECT "player_id", "score" FROM "leaderboard" WHERE "player_id" = {0} OR "player_id" = {1};';
  query = query.replace('{0}', winnerID);
  query = query.replace('{1}', losserID);

  var winnerScore = 0;
  var losserScore = 0;

  try {
    database.query(query, function(result) {
      winnerScore = result[0].score;
      losserScore = result[1].score;

      winnerScore = +winnerScore + +pointsForWinner;
      losserScore = +losserScore + +pointsForLosser;

      try {
        query = 'UPDATE "leaderboard" SET "score" = {0} WHERE "player_id" = {1};';
        query = query.replace('{0}', winnerScore);
        query = query.replace('{1}', winnerID);

        database.query(query, function(result) {
          try {
            query = 'UPDATE "leaderboard" SET "score" = ({0}) WHERE "player_id" = ({1});';
            query = query.replace('{0}', losserScore);
            query = query.replace('{1}', losserID);

            database.query(query, function(result) {
              response.send('Battle Reported!');
            });

          } catch (error) {
            console.error(error);
          }
        });

      } catch (error) {
        console.error(error);
      }
    });

  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
