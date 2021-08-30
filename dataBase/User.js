const { Schema, model } = require('mongoose');
const userRolesEnum = require('./user_roles_enum');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  roles: {
    type: String,
    default: userRolesEnum.USER,
    enum: Object.values(userRolesEnum)
  }
}, { timestamps: true });

module.exports = model('users', userSchema);
