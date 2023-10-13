const { Schema, model } = require("mongoose");
const userInfoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
    required: true,
  },
  tenacious: {
    type: Number,
    required: true,
  },
  resourceful: {
    type: Number,
    required: true,
  },
  open_minded: {
    type: Number,
    required: true,
  },
  problem_solving: {
    type: Number,
    required: true,
  },
  holistic: {
    type: Number,
    required: true,
  },
  inquisitive: {
    type: Number,
    required: true,
  },
  celebrating: {
    type: Number,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

const UserSchema = model("User", userInfoSchema);

module.exports = UserSchema;
