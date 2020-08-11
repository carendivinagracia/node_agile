const { BoardSchema } = require('./board');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255,
    trim: true,
  },
  addDate: { type: Date, default: Date.now() },
  //   Sample #1 adding sub-document
  //   board: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Board',
  //   },
  //   Sample #2 adding sub-document
  board: {
    type: BoardSchema,
    required: true,
  },
});

exports.TaskSchema = taskSchema;
