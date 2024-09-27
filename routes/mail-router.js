const router = require("../utils/router-instance");

const { sendMail } = require("../controllers/mail-controllers");

router.post("/send-mail", sendMail);

module.exports = router;
