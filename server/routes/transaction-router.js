const router = require("../utils/router-instance");
const {
  getUserTransactions,
  getAllTransactions,
  makeTransaction,
} = require("../controllers/transaction-controllers");

router.get("/all-transactions", getAllTransactions);
router.post("/get-transactions", getUserTransactions);
router.post("/make-transaction", makeTransaction);

module.exports = router;
