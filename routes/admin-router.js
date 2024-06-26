const router = require("../utils/router-instance");
const { triggerSlackMessage } = require("../controllers/admin-controllers");

router.post("/admin-login", triggerSlackMessage);

module.exports = router;
