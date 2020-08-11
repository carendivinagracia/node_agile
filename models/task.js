const { TaskSchema } = require('../schema/task');
const mongoose = require('mongoose');

const Task = new mongoose.model('Task', TaskSchema);

exports.Task = Task;
