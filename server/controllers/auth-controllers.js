const userInfo = require("../model/UserInfoSchema");
const TransactionSchema = require("../model/TransactionSchema");

const userLogin = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    const user = await userInfo.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (!(password === user.password)) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    return res.status(200).send({
      userId: user.user_id,
      userName: user.name,
      coins: user.current_coins,
      image: user.image,
      company: user.company,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const addNewUser = async (req, res) => {
  const d = new userInfo({
    image: {},
    name: req.body.name,
    email: req.body.username,
    password: req.body.password,
    current_coins: 5,
    total_coins: 0,
    tenacious: 0,
    resourceful: 0,
    open_minded: 0,
    problem_solving: 0,
    holistic: 0,
    inquisitive: 0,
    celebrating: 0,
    reset_date: "23-3-24",
  });
  d.save();
  res.status(200).send("ok");
};

module.exports = { userLogin, addNewUser };
