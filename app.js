var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes/routes');
app.use('/api', routes)


/////////////////////////// connecting to the database =>

const mongoose = require('mongoose')
require('dotenv').config();

const mongoString = process.env.DATABASE_URL
console.log(mongoString)
mongoose.connect(mongoString);

const db = mongoose.connection

db.on('error', (error) => {
  console.log("------------ERROR------------\n")
  console.log(error)
})

db.once('connected', () => {
  console.log('Database Connected');
})

///////////////////////////////////////

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
