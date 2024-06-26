const router = require("../utils/router-instance");
const { resetCoins } = require("../controllers/coins-controllers");

router.post("/reset-coins", resetCoins);

module.exports = router;
