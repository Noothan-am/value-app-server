const router = require("../utils/router-instance");
const { userLogin, getLogin } = require("../controllers/auth-controllers");

router.post("/login", userLogin);
router.get("/login", getLogin);

module.exports = router;
