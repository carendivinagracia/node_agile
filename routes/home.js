const express = require('express');
const router = express.Router();

router.get('/', ({ res }) => {
  res.render('home', {
    title: 'Server Express App',
    message: 'Hi! This is a sample express app.',
  });
});

module.exports = router;
