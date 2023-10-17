const router = require("../utils/router-instance");

const {
  getUserDetails,
  getAllUsersDetails,
  getLeaderboard,
} = require("../controllers/profile-controllers");

router.post("/profile", getUserDetails);
router.get("/all-user", getAllUsersDetails);
router.get("/leaderboard", getLeaderboard);

module.exports = router;
