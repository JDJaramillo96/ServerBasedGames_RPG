//Dependencies & Modules
var express = require('express');
var router = express.Router();
var database = require('./../database.js');

var query = '';

//## Character services [/character/{playerID}/{characterID}] -------------------------------------------------------------------------------------------------

//### Get character [GET]
router.get('/:playerID/:characterID', function(request, response) {
  var playerID = request.params.playerID;
  var characterID = request.params.characterID;

  //Response
  query = 'SELECT "character_id", "health_points", "attack_points", "defense_points", "sp_attack_points", "sp_defense_points" FROM "playercharacter" WHERE "player_id" IN ({0}) AND "character_id" IN ({1});';
  query = query.replace('{0}', playerID);
  query = query.replace('{1}', characterID);

  try {
    database.query(query, function(result) {
      response.send(JSON.stringify(result));
    });

  } catch (error) {
    console.error(error);
  }
});

//### Unlock character [POST]
router.post('/:playerID/:characterID', function(request, response) {
  var playerID = request.params.playerID;
  var characterID = request.params.characterID;

  //Response
  query = 'SELECT "base_health", "base_attack", "base_defense", "base_sp_attack", "base_sp_defense" FROM "character" WHERE "character_id" IN ({0});';
  query = query.replace('{0}', characterID);

  if (characterID <= 13) {
    try {
      database.query(query, function(result) {

      var character = [
        result[0].base_health,
        result[0].base_attack,
        result[0].base_defense,
        result[0].base_sp_attack,
        result[0].base_sp_defense
      ];

      query = 'INSERT INTO "playercharacter" ("player_id", "character_id", "health_points", "attack_points", "defense_points", "sp_attack_points", "sp_defense_points") VALUES (\'{0}\',\'{1}\',\'{2}\',\'{3}\',\'{4}\',\'{5}\',\'{6}\') ON CONFLICT ("player_id", "character_id") DO NOTHING;';
      query = query.replace('{0}', playerID);
      query = query.replace('{1}', characterID);
      query = query.replace('{2}', character[0]);
      query = query.replace('{3}', character[1]);
      query = query.replace('{4}', character[2]);
      query = query.replace('{5}', character[3]);
      query = query.replace('{6}', character[4]);

      try {
        database.query(query, function(result) {
          response.send('Character added!');
        });

      } catch (error) {
        console.error(error);
      }
    });

  } catch (error) {
    console.error(error);
  }

  } else {
    response.send('The character doesnt exist');
  }
});

module.exports = router;
