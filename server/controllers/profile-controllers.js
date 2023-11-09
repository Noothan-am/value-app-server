const moment = require("moment");
const userSchema = require("../model/UserInfoSchema");
const transactionSchema = require("../model/TransactionSchema");
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
      user_id,
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
      user_id,
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
        image: user.image,
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

    const leaderboard = userData
      .map(({ name, coins }) => ({ name, coins }))
      .sort((a, b) => b.coins - a.coins);

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getValidUser = async (req, res) => {
  try {
    let { from_user_id, to_user_id, value } = req.body;
    if (value == "Open_Minded") {
      value = "Open-Minded";
    } else if (value == "Problem_Solving") {
      value = "Problem-Solving";
    }

    const allTransactionDetails = await transactionSchema.find({
      from_user_id,
      to_user_id,
      celebration_moment: value,
    });

    if (!allTransactionDetails || allTransactionDetails.length === 0) {
      return res.status(200).send({ isValidUser: true });
    }

    let current_date = moment(moment().format("MM-YYYY"), "MM-YYYY");
    console.log({ current_date });
    let isValid = true;
    allTransactionDetails.map(({ diff }) => {
      let date_to_check = moment(diff, "MM-YYYY");
      console.log({ date_to_check });
      const difference = current_date.diff(date_to_check, "months");
      console.log({ difference });
      if (difference <= 0) {
        isValid = false;
      }
    });
    if (isValid) {
      return res.status(200).send({ isValidUser: true });
    } else {
      return res.status(200).send({ isValidUser: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  getUserDetails,
  getAllUsersDetails,
  getLeaderboard,
  getValidUser,
};
