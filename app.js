var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.route');
const session = require('express-session');
const SESS_NAME = 'sid';

var app = express();

app.use(session(
  {
  name:SESS_NAME,
  secret: 'random message', //this is needed for making a session key
  saveUninitialized: false, //for login sessions set it to false, setting to true means store blank sessions
  resave: false, 
  cookie: {
      expires: 600000 //or use maxAge ( takes in milliseconds value)
    }
  }
)
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);

//Setup mongoose Connection
mongoose.connect("mongodb://localhost/TriviaProject",
{ useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind('MongoDb Connection Error'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
