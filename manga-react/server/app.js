var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')
var route = require('./routes')

require('dotenv').config()

var app = express();
app.use(cors())

const url = 'mongodb://localhost/kitsu_react'
mongoose.connect(url, { useNewUrlParser: true })
.then(()=>{console.log("connected")},
  err =>{console.log("err",err);}
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err,'========= ERROR')
  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
