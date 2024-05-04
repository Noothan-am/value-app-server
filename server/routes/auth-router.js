const router = require("../utils/router-instance");
const { userLogin, addNewUser } = require("../controllers/auth-controllers");

router.post("/login", userLogin);
router.post("/add-user", addNewUser);

module.exports = router;
