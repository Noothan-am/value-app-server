const router = require("../utils/router-instance");
const {
  getUserTransactions,
  makeTransaction,
} = require("../controllers/transaction-controllers");

router.post("/get-transactions", getUserTransactions);
router.post("/make-transaction", makeTransaction);

module.exports = router;
