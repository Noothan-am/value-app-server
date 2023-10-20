const userInfo = require("../model/UserInfoSchema");

const userLogin = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    const user = await userInfo.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    // const isValid = await bcrypt.compare(password, user.password);
    if (!(password === user.password)) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    return res.status(200).send({ userId: user.user_id });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const get = (req, res) => {
  console.log("GET");
  res.send({ message: "this is get" });
};

module.exports = { userLogin, get };
