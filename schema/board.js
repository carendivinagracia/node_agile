// const { TaskSchema } = require('./task');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
    trim: true,
  },
  addDate: { type: Date, default: Date.now() },
  // tasks: [TaskSchema],
});

exports.BoardSchema = boardSchema;
