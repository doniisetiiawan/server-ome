/* eslint-disable global-require */
const mongoose = require('mongoose');
const config = require('./config');

module.exports = () => {
  const db = mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  require('../app/models/user.server.model');
  require('../app/models/article.server.model');
  return db;
};
