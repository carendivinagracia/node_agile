const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
  const dbConn = config.get('db');
  mongoose
    .connect(dbConn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${dbConn}...`))
    .catch((err) =>
      console.log(
        `Something went wrong while establishing connection to MongoDB: ${err.message}`
      )
    );
};
