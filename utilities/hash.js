const bcrypt = require('bcrypt');

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  return hashed;
};

const validatePassword = async (password, hashedPswd) => {
  const isValid = await bcrypt.compare(password, hashedPswd);

  return isValid;
};

exports.hashPassword = hashPassword;
exports.validatePassword = validatePassword;