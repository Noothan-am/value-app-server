const userSchema = require("../model/UserInfoSchema");

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }
    const userData = await userSchema.find({ user_id: userId });
    if (!userData) {
      return res.status(400).json({ message: "User not found" });
    }
    const {
      name,
      coins,
      image,
      tenacious,
      resourceful,
      open_minded,
      problem_solving,
      current_coins,
      total_coins,
      holistic,
      inquisitive,
      celebrating,
      reset_date,
    } = userData[0];

    res.status(200).json({
      name,
      coins,
      image,
      tenacious,
      resourceful,
      open_minded,
      current_coins,
      total_coins,
      problem_solving,
      holistic,
      inquisitive,
      celebrating,
      reset_date,
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
        user_id: user.user_id,
        name: user.name,
        current_coins: user.current_coins,
        total_coins: user.total_coins,
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

const resetProfileCoins = async (req, res) => {};

module.exports = { getUserDetails, getAllUsersDetails, getLeaderboard };
