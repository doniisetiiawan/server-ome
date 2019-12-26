const express = require('express');

module.exports = () => {
  const app = express();

  // eslint-disable-next-line global-require
  require('../app/routes/index.server.routes.js')(app);

  return app;
};
