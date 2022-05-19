// IMPORTS
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');
var messagesRouter = require('./routes/messages');
const { LoggerLevel } = require('mongodb');
const bodyParser = require('body-parser');
var cors = require('cors')
const http = require('http');
const socketio = require("socket.io");
var swaggerUi = require("swagger-ui-express");
swaggerDocument = require('./swagger.json');

// INITIALISATION
var app = express();
const server = http.createServer(app);
const io =  socketio(server,{
  cors: {
    origin: "http://localhost:8080"
  }
});
//socket
app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/messages', messagesRouter);

// DOC SWAGGER
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// SESSION (auth)
app.use(
  session({
      secret: "very secret this is",
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

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
  res.json({"error":err});
});

module.exports = {app: app, server:server};
