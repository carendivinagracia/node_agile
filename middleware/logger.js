// To show two or more loggers, set DEBUG=app.* or DEBUG=app:name1, app:name2

const customDebugger = require('debug')('app:custom-debugger');

const logger = ({ next }) => {
  // Will be shown in logs if DEBUG=app:custom-debugger
  customDebugger('This is a custom debugger...');
  next();
};

module.exports = logger;
