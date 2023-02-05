const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 100,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 500,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model('User', userSchema);