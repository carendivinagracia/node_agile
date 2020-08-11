const { Task } = require('../models/task');
const { Board } = require('../models/board');
const express = require('express');
const router = express.Router();

router.get('/', async ({ res }) => {
  const tasks = await Task.find()
    // Specify fields to select in a sub-document
    // .populate('board', 'name -_id')
    .populate('board', 'name _id')
    .select('name board')
    .sort({ name: 1 });

  res.send(tasks);
  // res.render(tasks);
});

router.get('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);

  if (!task) res.status(400).send('Task is not found!');

  res.send(task);
  // res.render('task', { task });
});

router.put('/', async (req, res) => {
  const { name, description, boardId } = req.body;
  let result;

  const board = await Board.findById(boardId);

  if (!board) res.status(400).send('Board is not found!');

  const newTask = new Task({
    name,
    description,
    // sample #1
    // board: boardId,
    // // sample #2
    board: {
      _id: board._id,
      name: board.name,
    },
  });

  try {
    const addTaskResult = await newTask.save();
    result = addTaskResult;
  } catch (err) {
    result = err.message;
  }

  res.send(result);
});

router.delete('/', async (req, res) => {
  const { taskId } = req.body;

  const task = await Task.findById(taskId);

  if (!task) res.status(400).send('Task if not found!');

  task.remove();

  res.send(task);
});

module.exports = router;
