const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../../index');
const { User } = require('../../../models/user');
const { hashPassword } = require('../../../utilities/hash');

describe('User routes', () => {
  describe('GET all routes', () => {
    let token;
    let userId;

    beforeEach(async () => {
      token = new User().generateAuthToken();
      userId = mongoose.Types.ObjectId();

      const newUser = {
        _id: userId,
        name: '12345',
        email: '12345@test.com',
        password: '12345',
        role: 'admin',
      };
      newUser.password = await hashPassword(newUser.password);

      const addUserInDB = await new User(newUser);
      await addUserInDB.save();
    });

    afterEach(async () => {
      await server.close();
      await User.deleteMany({});
    });

    test('should return 401 if token is not supplied', async () => {
      token = '';
      const response = await request(server)
        .get('/user')
        .set('x-auth-token', token);

      expect(response.status).toBe(401);
    });

    test('should return a list of users', async () => {
      const response = await request(server)
        .get('/user')
        .set('x-auth-token', token);

      expect(response.status).toBe(200);
    });
  });
});
