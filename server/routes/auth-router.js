const router = require("../utils/router-instance");
const { userLogin, get } = require("../controllers/auth-controllers");

router.post("/login", userLogin);
router.get("/login", get);

module.exports = router;
