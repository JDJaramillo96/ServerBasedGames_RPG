//Dependencies & Modules
var express = require('express');
var router = express.Router();
var database = require('./../database.js');
var bodyParser = require('body-parser');

var query='';

//## Character stats services [/characterStats/{playerID}/{characterID}] -------------------------------------------------------------------------------------------------

//### Add stat points [POST]
router.post('/:playerID/:characterID', function(request, response) {
  var playerID = request.params.playerID;
  var characterID = request.params.characterID;
  //Body elements
  var statsToIncrease = request.body.statsToIncrease;
  var pointsToAdd = request.body.pointsToAdd;

  //Response
  query = 'SELECT {0} FROM "playercharacter" WHERE "player_id" IN ({1}) AND "character_id" IN ({2});';
  query = query.replace('{0}', statsToIncrease);
  query = query.replace('{1}', playerID);
  query = query.replace('{2}', characterID);

  var points = 0;

  try {
    database.query(query, function(result) {
      switch (statsToIncrease) {
        case "health_points":
          ponts = +result[0].health_points + +pointsToAdd;
          break;
        case "attack_points":
          points = +result[0].attack_points + +pointsToAdd;
          break;
        case "defense_points":
          points = +result[0].defense_points + +pointsToAdd;
          break;
        case "sp_attack_points":
          points = +result[0].sp_attack_points + +pointsToAdd;
          break;
        case "sp_defense_points":
          points = +result[0].sp_defense_points + +pointsToAdd;
          break;
        default:
          console.warn('This is not an stat');
        }

        query = 'UPDATE "playercharacter" SET "{0}" = {1} WHERE "player_id" IN ({2}) AND "character_id" IN ({3});';
        query = query.replace('{0}', statsToIncrease);
        query = query.replace('{1}', points);
        query = query.replace('{2}', playerID);
        query = query.replace('{3}', characterID);

        try {
          database.query(query,function(result) {
            response.send('Stats Added!');
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
