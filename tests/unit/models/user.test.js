const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

// user.generateAuthToken is a test suite
describe('User.generateAuthToken', () => {
  test('should return a valid JWT', () => {
    const payload = {
      _id: mongoose.Types.ObjectId().toHexString(),
      role: 'admin',
    };
    
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwt-key'));

    expect(decoded).toMatchObject(payload);
  });
});
