//Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Modules
var index = require('./routes/index');
var character = require('./routes/character');
var characterStats = require('./routes/characterStats');
var team = require('./routes/team');
var battle = require ('./routes/battle');

var app = express();
var port = process.env.ELEPHANTSQL_URL || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', index);
app.use('/character', character);
app.use('/characterStats', characterStats);
app.use('/team', team);
app.use('/battle', battle);

//Catch 404
app.use(function(request, response, next) {
  var error = new Error('Not Found');

  error.status = 404;
  next(error);
});

//Error handler
app.use(function(error, request, response, next) {
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  response.status(error.status || 500);
  response.render('error');
});

//Server listen
app.listen(port, function() {
  console.log('App start listen!');
});

//Exporting module
module.exports = app;
