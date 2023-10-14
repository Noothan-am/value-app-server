const router = require("../utils/router-instance");

const {
  getTransactionDetails,
} = require("../controllers/transaction-controllers");

router.get("/my-profile", getTransactionDetails);

module.exports = router;
