module.exports = {
  db: 'mongodb://localhost/mean-book',
  sessionSecret: 'developmentSessionSecret',
  facebook: {
    clientID: 'Facebook Application ID',
    clientSecret: 'Facebook Application Secret',
    callbackURL:
      'http://localhost:3000/oauth/facebook/callback',
  },
  twitter: {
    clientID: 'Twitter Application ID',
    clientSecret: 'Twitter Application Secret',
    callbackURL:
      'http://localhost:3000/oauth/twitter/callback',
  },
  google: {
    clientID: 'Application Id',
    clientSecret: 'Application Secret',
    callbackURL:
      'http://localhost:3000/oauth/google/callback',
  },
};
