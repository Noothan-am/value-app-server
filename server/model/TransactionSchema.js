const { Schema, model } = require("mongoose");
const transactionInfoSchema = new Schema({
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

const UserSchema = model("TransactionInfoSchema", transactionInfoSchema);

module.exports = UserSchema;
