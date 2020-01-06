module.exports = {
  db: 'mongodb://localhost/mean-book',
  sessionSecret: 'developmentSessionSecret',
  facebook: {
    clientID: '197836114050020',
    clientSecret: 'aeca2aa61f62b08ea08b1780cba491d4',
    callbackURL:
      'http://localhost:3000/oauth/facebook/callback',
  },
  twitter: {
    clientID: '08h4XzUCu8c3g5RfhSAuQjquP',
    clientSecret: 'S8ZKzLkCPPy2bFHSjvMXnUqA6QMLQsRULwQ5eJ8u3mfbdovmED',
    callbackURL:
      'http://localhost:3000/oauth/twitter/callback',
  },
  google: {
    clientID: '842162122191-sdv3ue976kjcq9as2o4ki5pg39a6ct0o.apps.googleusercontent.com',
    clientSecret: 'tc_k6kL9B9PmeCwy70wW3TLT',
    callbackURL:
      'http://localhost:3000/oauth/google/callback',
  },
};
