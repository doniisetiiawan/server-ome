const passport = require('passport');
const mongoose = require('mongoose');

module.exports = () => {
  const User = mongoose.model('User');

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne(
      { _id: id },
      '-password -salt',
      (err, user) => {
        done(err, user);
      },
    );
  });

  // eslint-disable-next-line global-require
  require('./strategies/local.js')();
};
