const userSchema = require("../model/UserInfoSchema");

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }
    const userData = await userSchema.findById(userId);
    if (!userData) {
      return res.status(400).json({ message: "User not found" });
    }
    const {
      name,
      coins,
      tenacious,
      resourceful,
      open_minded,
      problem_solving,
      holistic,
      inquisitive,
      celebrating,
    } = userData;
    res.status(200).json({
      name,
      coins,
      tenacious,
      resourceful,
      open_minded,
      problem_solving,
      holistic,
      inquisitive,
      celebrating,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getAllUsersDetails = async (req, res) => {
  try {
    const userData = await userSchema.find({});
    if (!userData) {
      return res.status(400).json({ message: "no users" });
    }
    const users = userData.map((user) => {
      return {
        name: user.name,
        coins: user.coins,
      };
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const userData = await userSchema.find({});
    if (!userData) {
      return res.status(400).json({ message: "no users" });
    }

    const final = userData
      .map(({ name, coins }) => ({ name, coins }))
      .sort((a, b) => b.coins - a.coins);

    res.status(200).json(final);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports = { getUserDetails, getAllUsersDetails, getLeaderboard };
