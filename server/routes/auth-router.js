const router = require("../utils/router-instance");
const { userLogin, userLoginGet } = require("../controllers/auth-controllers");

router.get("/login", () => {
  console.log("i am here!!");
});

router.get("/", (req, res) => {
  console.log("i am here!!");
  res.send("hello world");
});

router.post("/login", (req, res) => {
  res.send("this is login post");
});

module.exports = router;
