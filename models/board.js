const { BoardSchema } = require('../schema/board');
const mongoose = require('mongoose');

const Board = mongoose.model('Board', BoardSchema);

exports.Board = Board;
