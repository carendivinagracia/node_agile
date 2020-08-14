const express = require('express');

module.exports = (app) => {
  app.use(express.static('public'));
  app.set('view engine', 'pug');
  app.set('views', './views');
};