const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');

// user.generateAuthToken is a test suite
describe('user.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = {
      name: 'Caren Jest',
      role: 'admin',
    };
    const user = new User(payload);
    const token = user.generateTestAuthToken();
    const decoded = jwt.verify(token, config.get('jwt-key'));

    expect(decoded).toMatchObject(payload);
  });
});
