const express = require('express');
const app = express();

// Template Engine
require('./startup/template')(app);

// Config
require('./startup/config')();

// Routes
require('./startup/routes')(app);

// Database Connection
require('./startup/db')();

// Logging
// require('./startup/logger')();

const server = app.listen(3000, () => {
  if (process.env.NODE_ENV === 'development')
    console.log('Listening on port 3000...');
});

module.exports = server;

// to exit the app, run process.exit(1)
