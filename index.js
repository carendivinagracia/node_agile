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

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log('Listening on port 3000...'));

module.exports = server;

// to exit the app, run process.exit(1)
