const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Unauthorized access. No token supplied.');

  try {
    const decoded = jwt.verify(token, config.get('jwt-key'));
    req.user = decoded;
  } catch (error) {
    res.status(404).send('Token is invalid.');
  }

  next();
};

module.exports = auth;
