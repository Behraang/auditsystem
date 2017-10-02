"use strict";


// set up ======================================================================
var express           = require('express');
var app               = express();
var path              = require('path');
var logger            = require('morgan');
var bodyParser        = require('body-parser');
var expresshandlebars = require('express-handlebars');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var configDB     = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url,{
  useMongoClient: true
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.engine('handlebars', expresshandlebars({
  layoutsDir: 'views',
  defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); // read cookies (needed for auth)


// required for passport
app.use(session({ secret: 'ilovecookiescookiescookiescookiescookiescookiescookies' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// Check helper for handlebars
var hbs = require('handlebars');
hbs.registerHelper("setChecked", function(value, currentValue)
{
    if ( value == currentValue ) {
       return "checked"
    } else {
       return "";
    }
});


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


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
