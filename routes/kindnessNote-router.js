const router = require("../utils/router-instance");

const {
  sendKindnessNote,
  getMonthlyKindnessNotes,
} = require("../controllers/kindnessNote-controllers");

router.post("/send-kindness-note", sendKindnessNote);
router.post("/get-monthly-kindness-notes", getMonthlyKindnessNotes);
module.exports = router;
