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
    // const isValid = await bcrypt.compare(password, user.password);
    if (!(password === user.password)) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    return res.status(200).send({
      userId: user.user_id,
      userName: user.name,
      coins: user.current_coins,
      image: user.image,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getLogin = async (req, res) => {
  // const d = new userInfo({
  //   user_id: "m7p006fa6d4c704caca1398431490716",
  //   image: "string",
  //   name: "rahul",
  //   email: "rahul@gmail.com",
  //   password: "rahul",
  //   current_coins: 5,
  //   total_coins: 23,
  //   tenacious: 1,
  //   resourceful: 1,
  //   open_minded: 3,
  //   problem_solving: 4,
  //   holistic: 0,
  //   inquisitive: 50,
  //   celebrating: 7,
  //   reset_date: "18-10-2023",
  // });
  // d.save();
  // res.send("ok");
};

module.exports = { userLogin, getLogin };
