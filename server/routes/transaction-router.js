const router = require("../utils/router-instance");
const {
  getValues,
  getUserTransactions,
  getAllTransactions,
  makeTransaction,
  updateTransaction,
} = require("../controllers/transaction-controllers");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });
router.post("/all-transactions", getAllTransactions);
router.post("/get-transactions", getUserTransactions);
router.post("/get-values", getValues);
router.post("/make-transaction", upload.single("image"), makeTransaction);
router.post("/update-transactions", updateTransaction);

module.exports = router;
