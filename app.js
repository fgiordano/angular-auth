var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
// const mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
const authRoutes = require('./routes/auth-routes');

require('./config/database-setup');
require('./config/passport-setup');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: 'string is to avoid a warning',
		resave: true,
		saveUninitialized: true
	})
);
// passport goes after the session
app.use(passport.initialize());
app.use(passport.session());

//most middlewares should go before the routes


// ROUTES
app.use('/', index);
app.use('/users', users);
app.use('/', authRoutes);
//---------

app.use((req, res, next) => {
  res.sendfile(__dirname + '/public/index.html');
});

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
