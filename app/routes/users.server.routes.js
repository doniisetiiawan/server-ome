const passport = require('passport');
const users = require('../../app/controllers/users.server.controller');

module.exports = (app) => {
  app.route('/signup').post(users.signup);

  app.route('/signin').post(
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true,
    }),
  );

  app.get(
    '/oauth/facebook',
    passport.authenticate('facebook', {
      failureRedirect: '/signin',
    }),
  );

  app.get(
    '/oauth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/signin',
      successRedirect: '/',
    }),
  );

  app.get('/signout', users.signout);

  app
    .route('/users')
    .post(users.create)
    .get(users.list);

  app
    .route('/users/:userId')
    .get(users.read)
    .put(users.update)
    .delete(users.delete);

  app.param('userId', users.userByID);
};
