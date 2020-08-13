const { User } = require('../models/user');
const {
  validateCreateUserInput,
  validateUpdateUserInput,
} = require('../schema/user');
const { hashPassword, validatePassword } = require('../utilities/hash');
const auth = require('../middleware/auth');
const adminOrOwner = require('../middleware/permission');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const users = await User.find().sort({ name: 1 });

  res.send(users);
});

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  if (!email && password)
    return res.status(400).send('No email or password supplied.');

  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('User not found.');

  const validateCredential = await validatePassword(password, user.password);
  if (!validateCredential)
    return res.status(400).send('Password is incorrect.');

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(user);
});

router.get('/me', auth, async (req, res) => {
  const { _id, role } = req.user;
  const user = await User.findOne({ _id, role }).select({
    name: 1,
    email: 1,
    role: 1,
  });

  res.send(user);
});

router.get(':id', auth, async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) return res.status(404).send('User is not found.');

  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validateCreateUserInput(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password, role } = req.body;
  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateUpdateUserInput(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { id } = req.params;
  const { name, email } = req.body;

  const userUpdate = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
    },
    { new: true }
  );

  if (!userUpdate)
    return res.status(404).send('User to be updated is not found.');

  res.send(userUpdate);
});

router.delete('/:id', [auth, adminOrOwner], async (req, res) => {
  const { id } = req.params;

  const deleteUser = await User.findByIdAndRemove(id);

  if (!deleteUser)
    return res.status(404).send('User to be deleted is not found.');

  res.send(deleteUser);
});

module.exports = router;
