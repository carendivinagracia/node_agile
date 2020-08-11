const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const { home, board, task, user } = require('./routes');
const logger = require('./middleware/logger');
const app = express();

// Environment
console.log(`Process NODE_ENV: ${process.env.NODE_ENV}`);
// If process.env.NODE_ENV is undefined, app.env defaults to development
console.log(`App ENV: ${app.get('env')}`);

// Configuration handler per environment. Access config examples:
// console.log(`Application mail server: ${config.get('mail.server')}`);
// console.log(`Application mail sender: ${config.get('mail.sender')}`);
// console.log(`Application mail password: ${config.get('mail.password')}`);

// to exit the app, run process.exit(1)

// Reads request body in JSON format (req.body)
app.use(express.json());

// Reads request body from url-encoded format
app.use(express.urlencoded({ extended: true }));

// Location of public files/assets
app.use(express.static('public'));

// Third-party middlewares for NodeJS
// 1. Secure HTTP requests
app.use(helmet());

// 2. HTTP requests logger
app.use(morgan('common'));

// Custom logger middleware
app.use(logger);

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use('/', home);
app.use('/board', board);
app.use('/task', task);
app.use('/user', user);

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost/agile', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) =>
    console.log(
      `Something went wrong while establishing connection to MongoDB: ${err.message}`
    )
  );

app.listen(3000, () => console.log('Listening on port 3000...'));
