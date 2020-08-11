const express = require('express');
const helmet = require('helmet');
// const morgan = require('morgan');
const { home, board, task, user } = require('../routes');

module.exports = (app) => {
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
  // app.use(morgan('common'));

  // Application routes
  app.use('/', home);
  app.use('/board', board);
  app.use('/task', task);
  app.use('/user', user);
};
