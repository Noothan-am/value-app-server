const router = require("../utils/router-instance");

const {
  getUserDetails,
  getAllUsersDetails,
} = require("../controllers/profile-controllers");

router.post("/profile", getUserDetails);
router.get("/all-user", getAllUsersDetails);

module.exports = router;
