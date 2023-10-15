const router = require("../utils/router-instance");
const { userLogin } = require("../controllers/auth-controllers");

router.post("/login", userLogin);

module.exports = router;
