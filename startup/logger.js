const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = () => {
  winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    transports: [
      new winston.transports.File({
        filename: '../log/app-warning.log',
        level: 'warning',
      }),
      new winston.transports.File({
        filename: '../log/app-info.log',
        level: 'info',
      }),
      new winston.transports.File({
        filename: '../log/app-debug.log',
        level: 'debug',
      }),
      // new winston.transports.MongoDB({
      //   db: 'mongodb://localhost/agile',
      //   level: 'info',
      //   options: {
      //     useUnifiedTopology: true,
      //   },
      // }),
    ],
    rejectionHandlers: [
      new winston.transports.File({
        filename: '../log/app-error.log',
      }),
    ],
    exceptionHandlers: [
      new winston.transports.File({
        filename: '../log/app-error.log',
      }),
    ],
  });
};
