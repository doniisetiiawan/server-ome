/* eslint-disable global-require */
const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passport = require('passport');
const config = require('./config');
const configureSocket = require('./socketio');

module.exports = () => {
  const app = express();

  const server = http.createServer(app);
  const io = socketio.listen(server);

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

  app.use(bodyParser.json());
  app.use(methodOverride());

  const mongoStore = new MongoStore({
    url: config.db,
  });

  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret,
      store: mongoStore,
    }),
  );

  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());

  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/users.server.routes.js')(app);
  require('../app/routes/articles.server.routes.js')(app);

  app.use(express.static('./public'));

  configureSocket(server, io, mongoStore);

  return server;
};
