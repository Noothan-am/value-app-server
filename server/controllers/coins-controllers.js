const userInfoSchema = require("../model/UserInfoSchema");
const moment = require("moment");

const resetCoins = async (req, res) => {
  try {
    await userInfoSchema.updateMany(
      {},
      { $set: { current_coins: 5, reset_date: moment().format("DD-MM-YYYY") } }
    );
    res.status(200).json({ message: "Coins reset successfully." });
  } catch (error) {
    console.log("error while updating profile", error);
  }
};

module.exports = { resetCoins };
