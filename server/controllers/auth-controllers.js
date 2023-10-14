const userInfo = require("../model/UserInfoSchema");

const userLogin = async (req, res) => {
  try {
    const data = JSON.parse(req.body);
    const { email, password } = data;
    const user = await userInfo.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "No user found" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(403).json({ message: "invalid credentials" });
    }
    return res.status(200).send({ message: "thisis token" });
  } catch (error) {
    return res.status(403).json({ message: error });
  }
};

const userLoginGet = async (req, res) => {
  res.send("this is login get");
};

module.exports = { userLogin, userLoginGet };
