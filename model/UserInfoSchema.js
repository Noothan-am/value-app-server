const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userInfoSchema = new Schema({
  user_id: {
    type: String,
    default: uuidv4,
  },
  image: {
    type: Object,
    required: true,
  },
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
  current_coins: {
    type: Number,
    required: true,
  },
  total_coins: {
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
  company: {
    id: { type: String },
    company_name: { type: String },
  },
  reset_date: {
    type: String,
    required: true,
  },
});

const UserSchema = model("UserInfoSchema", userInfoSchema);

module.exports = UserSchema;
