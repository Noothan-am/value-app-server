const router = require("../utils/router-instance");

const {
  getUserDetails,
  getAllUsersDetails,
  getLeaderboard,
  getValidUser,
  deleteUser,
  addToken,
} = require("../controllers/profile-controllers");

router.post("/all-user", getAllUsersDetails);
router.get("/leaderboard", getLeaderboard);
router.post("/delete-user", deleteUser);
router.post("/profile", getUserDetails);
router.post("/valid-user", getValidUser);
router.post("/save-token", addToken);

module.exports = router;
