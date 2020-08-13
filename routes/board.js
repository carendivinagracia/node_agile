const { Board } = require('../models/board');
const express = require('express');
const router = express.Router();

router.get('/', async ({ res }) => {
  const boards = await Board.find().select({ name: 1 }).sort({ name: 1 });
  // res.render(boards);
  res.send(boards);
});

router.get('/:boardId', async (req, res) => {
  const { boardId } = req.params;
  const board = await Board.findById(boardId);

  if (!board) res.status(400).send('Board is not found!');

  res.send(board);
  // res.render('board', { board });
});

router.put('/', async (req, res) => {
  const { name } = req.body;
  let result;

  let addBoardResult = new Board({
    name,
  });

  try {
    addBoardResult = await addBoardResult.save();
    result = addBoardResult;
  } catch (err) {
    result = err.message;
  }

  res.send(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deleteBoard = await Board.findByIdAndRemove(id);

  if (!deleteBoard)
    return res.status(404).send('Board to be deleted is not found.');

  res.send(deleteBoard);
});

module.exports = router;
