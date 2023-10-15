const moment = require("moment");
const { Schema, model } = require("mongoose");
const transactionInfoSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
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
  date: {
    type: String,
    default: moment().format("DD-MM-YYYY"),
  },
});

const UserSchema = model("TransactionInfoSchema", transactionInfoSchema);

module.exports = UserSchema;