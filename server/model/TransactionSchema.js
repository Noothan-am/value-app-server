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
  from_user_id: {
    type: "string",
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  to_user_id: {
    type: "string",
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

const transactionSchema = model("TransactionInfoSchema", transactionInfoSchema);

module.exports = transactionSchema;
