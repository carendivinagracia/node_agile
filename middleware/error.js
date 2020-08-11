const winston = require('winston');

// Error handler for request processing pipelines
const errorHandler = ({ err, res, next }) => {
  winston.error(err.message, err);

  res.status(500).send('Something went wrong.');
  next();
};

module.exports = errorHandler;
