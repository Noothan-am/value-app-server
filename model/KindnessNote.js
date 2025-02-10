const { Schema, model } = require("mongoose");

const kindnessNoteSchema = new Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  kindnessType: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  hasSeen: {
    type: Boolean,
    default: false,
  },
});

const KindnessNote = model("KindnessNote", kindnessNoteSchema);

module.exports = KindnessNote;
