const KindnessNote = require("../model/KindnessNote");
const UserSchema = require("../model/UserInfoSchema");
const sendKindnessNote = async (req, res) => {
  try {
    const { senderId, receiverId, kindnessType, message } = req.body;

    const sender = await UserSchema.findOne({ user_id: senderId });
    const receiver = await UserSchema.findOne({ user_id: receiverId });
    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }

    console.log(senderId, receiverId, kindnessType, message);

    const newNote = new KindnessNote({
      senderId,
      receiverId,
      kindnessType,
      message,
      hasSeen: false,
    });

    await newNote.save();
    res.status(201).json({ message: "Kindness note sent successfully!" });
  } catch (error) {
    console.error("Failed to send kindness note:", error);
    res.status(500).json({ message: "Failed to send kindness note" });
  }
};

const getMonthlyKindnessNotes = async (req, res) => {
  const { userId } = req.params;
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  const endOfMonth = new Date();
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);

  try {
    const notes = await KindnessNote.find({
      receiverId: "U6BsaZUxtjsh7rwNEhTB",
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Failed to fetch monthly kindness notes:", error);
    res.status(500).json({ message: "Failed to fetch monthly kindness notes" });
  }
};

module.exports = { sendKindnessNote, getMonthlyKindnessNotes };
