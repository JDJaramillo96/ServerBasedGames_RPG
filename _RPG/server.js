//Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Properties
var port = process.env.ELEPHANTSQL_URL || 3000;

//Modules
var character = require('./routes/character.js');
var characterStats = require('./routes/characterStats.js');
var team = require('./routes/team.js');
var battle = require('./routes/battle.js');

app.use('/character', character);
app.use('/characterStats', characterStats);
app.use('/team', team);
app.use('/battle', battle);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Server
app.get('/', function(request, response) {
  response.send('Wecome to multiplayer RPG-API!');
})

//Server listen
app.listen(port, function() {
  console.log('App start listen!');
});
