const userInfoSchema = require("../model/UserInfoSchema");
const moment = require("moment");

const resetCoins = async (req, res) => {
  try {
    console.log("here");
    await userInfoSchema.updateMany(
      {},
      { $set: { current_coins: 5, reset_date: moment().format("DD-MM-YYYY") } }
    );
    res.status(200).json({ message: "Coins reset successfully." });
  } catch (error) {
    console.log("error while updating profile", error);
    res.status(400).json({ message: "Coins reset unsuccessfully." });
  }
};

module.exports = { resetCoins };
