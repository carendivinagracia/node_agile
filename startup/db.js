const mongoose = require('mongoose');

module.exports = () => {
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
};
