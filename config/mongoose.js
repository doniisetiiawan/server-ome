const mongoose = require('mongoose');
const config = require('./config');

module.exports = () => {
  const db = mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  // eslint-disable-next-line global-require
  require('../app/models/user.server.model');
  return db;
};
