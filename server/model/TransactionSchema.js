const { Schema, model } = require("mongoose");
const userInfoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  celebrating_value: {
    type: String,
    required: true,
  },
  celebration_moment: {
    type: String,
  },
});

const UserSchema = model("User", userInfoSchema);

module.exports = UserSchema;
