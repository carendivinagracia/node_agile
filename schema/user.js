const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  address: String,
  role: {
    type: String,
    enum: ['admin', 'owner', 'assignee'],
    required: true,
  },
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ id: this._id, role: this.role }, config.get('jwt-key'));

  return token;
};

userSchema.methods.generateTestAuthToken = function() {
  const token = jwt.sign({ name: this.name, role: this.role }, config.get('jwt-key'));

  return token;
};

const validateCreateUserInput = (userInput) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    address: Joi.string(),
    role: Joi.string().required(),
  });

  return schema.validate(userInput);
};

const validateUpdateUserInput = (userInput) => {
  const schema = {
    name: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    address: Joi.string(),
  };

  return Joi.valid(userInput, schema);
};

exports.UserSchema = userSchema;
exports.validateCreateUserInput = validateCreateUserInput;
exports.validateUpdateUserInput = validateUpdateUserInput;
