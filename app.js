"use strict";

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expresshandlebars = require('express-handlebars');

// make db ready
 var mongo = require('mongodb');
 var monk = require('monk');
 var db = monk('192.168.6.10:27017/master');

var app = express();

// Make our db accessible to our router
 app.use(function(req,res,next){
     req.db = db;
     next();
 });

var routes = require('./routes');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
var hbs = require('handlebars');
hbs.registerHelper("setChecked", function(value, currentValue)
{
    if ( value == currentValue ) {
       return "checked"
    } else {
       return "";
    }
});

app.engine('handlebars', expresshandlebars({
  layoutsDir: 'views',
  defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500);
  var data = {
    message: err.message,
    error: err
  };
  if (req.xhr) {
    res.json(data);
  } else {
    res.render('error', data);
  }
});

module.exports = app;
