var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var team = require('./routes/team');
var team = require('./routes/team');
var room = require('./routes/room');
var escape = require('./routes/escape');
var signup = require('./routes/signup');
var signin = require('./routes/signin');
var createteam = require('./routes/createteam');
var filter = require('./routes/filter');
var validTeam = require('./routes/validTeam');
var oldTeam = require('./routes/oldTeam');
var currentTeam = require('./routes/currentTeam');
var escapelist = require('./routes/escapelist');

var mangopay = require('./routes/mangopay');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, '/public')));

app.use('/', index);
app.use('/users', users);
app.use('/team', team);
app.use('/mangopay', mangopay);
app.use('/room', room);
app.use('/escape', escape);
app.use('/signup',signup);
app.use('/signin',signin);
app.use('/createteam',createteam);
app.use('/filter', filter);
app.use('/validTeam', validTeam);
app.use('/currentTeam', currentTeam);
app.use('/oldTeam', oldTeam);
app.use('/escapelist', escapelist);

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
