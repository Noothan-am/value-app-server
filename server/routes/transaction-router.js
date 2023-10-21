const router = require("../utils/router-instance");
const {
  getAllTransactions,
  makeTransaction,
} = require("../controllers/transaction-controllers");

router.get("/get-transactions", getAllTransactions);
router.post("/make-transaction", makeTransaction);

module.exports = router;
