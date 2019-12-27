const mongoose = require('mongoose');
const config = require('./config');

module.exports = () => mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
