const { Task } = require('../models/task');
const { Board } = require('../models/board');
const Fawn = require('fawn');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

Fawn.init(mongoose);

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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deleteTask = await Task.findByIdAndRemove(id);

  if (!deleteTask)
    return res.status(404).send('Task to be deleted is not found.');

  res.send(deleteTask);
});

router.post('/transaction', async (req, res) => {
  const { taskId, boardId } = req.body;

  const parseTaskId = new mongoose.Types.ObjectId(taskId);
  const parseBoardId = new mongoose.Types.ObjectId(boardId);

  const task = new Fawn.Task();
  const board = new Board({ name: 'Test_Transaction Board 5' });

  task
    .save('boards', board)
    .update('tasks', { _id: parseTaskId }, { name: 'Test parsed!' })
    .remove('boards', { _id: parseBoardId })
    .run()
    .then(() => {
      res.send(true);
    });
});

module.exports = router;
