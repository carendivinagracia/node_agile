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
require('./startup/logger')();


app.listen(3000, () => console.log('Listening on port 3000...'));

// to exit the app, run process.exit(1)
