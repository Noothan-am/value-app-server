const express = require("express");
const router = express.Router();
const { userLogin } = require("../controllers/controller");

router.get("/login", () => {
  console.log("i am here!!");
});
router.post("/login", userLogin);

module.exports = router;
