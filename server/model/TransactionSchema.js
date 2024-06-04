const moment = require("moment");
const { Schema, model } = require("mongoose");
const transactionInfoSchema = new Schema({
  image: {
    type: Schema.Types.Mixed,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  from_user_id: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  to_user_id: {
    type: String,
    required: true,
  },
  celebrating_value: {
    type: String,
    required: true,
  },
  celebration_moment: {
    type: String,
    required: true,
  },
  has_seen: {
    type: Boolean,
    default: false,
  },
  company: {
    id: { type: String },
    company_name: { type: String },
  },
  date: {
    type: String,
    default: moment().format("DD-MM-YYYY"),
  },
  diff: {
    type: String,
    default: moment().format("MM-YYYY"),
  },
});

const transactionSchema = model("TransactionInfoSchema", transactionInfoSchema);

module.exports = transactionSchema;
