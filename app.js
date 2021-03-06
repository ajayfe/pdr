var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var mongoose = require("mongoose");

//controllers
var pdrController = require("./controllers/pdrController");





var index = require('./routes/index');
var state = require('./routes/states');
var stateName = require('./routes/stateName');
var cityName = require('./routes/cityName');
var city = require('./routes/city');
var crondailyrunbymeonly = require('./routes/crondailyrunbymeonly');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.basedir = path.join('\\', 'assets');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/states/', state);
//app.use('/states/:id', stateName);
app.use('/states/Petrol/:id', stateName);
app.use('/states/Diesel/:id', stateName);
//app.use('/states/:id/cities', city);
//app.use('/states/:id/city/:id', cityName);
app.use('/admin/crondailyrunbymeonly/', crondailyrunbymeonly);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
