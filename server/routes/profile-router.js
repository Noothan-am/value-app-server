const router = require("../utils/router-instance");

const {
  getUserDetails,
  getAllUsersDetails,
  getLeaderboard,
  getValidUser,
} = require("../controllers/profile-controllers");

router.get("/all-user", getAllUsersDetails);
router.get("/leaderboard", getLeaderboard);

router.post("/profile", getUserDetails);
router.post("/valid-user", getValidUser);

module.exports = router;
