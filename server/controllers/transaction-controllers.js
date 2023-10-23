const transactionSchema = require("../model/TransactionSchema");
const userInfoSchema = require("../model/UserInfoSchema");

const getAllTransactions = async (req, res) => {
  try {
    const allTransactionDetails = await transactionSchema.find({});
    if (!allTransactionDetails) {
      return res.status(400).send("No one has done any transaction yet");
    }

    const transactionDetails = allTransactionDetails
      .map(
        ({
          from_name,
          to_name,
          celebrating_value,
          celebration_moment,
          date,
          image,
        }) => ({
          from_name,
          to_name,
          celebrating_value,
          celebration_moment,
          date,
          image,
        })
      )
      .slice(0, 4);

    res.send(transactionDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const updateProfile = async (fromId, toId, celebration_moment) => {
  try {
    console.log(fromId, toId);
    await userInfoSchema.updateOne({ user_id: fromId }, [
      {
        $set: {
          current_coins: { $subtract: ["$current_coins", 1] },
        },
      },
    ]);

    await userInfoSchema.updateOne({ user_id: toId }, [
      {
        $set: {
          total_coins: { $add: ["$total_coins", 1] },
          [celebration_moment.toLocaleLowerCase()]: {
            $add: [`$${celebration_moment}`, 1],
          },
        },
      },
    ]);
  } catch (error) {
    console.log("error while updating profile", error);
  }
};

const makeTransaction = async (req, res) => {
  try {
    const {
      from,
      to,
      celebrating_value,
      celebration_moment,
      image,
      to_user_id,
      from_user_id,
    } = req.body;

    if (
      !from ||
      !to ||
      !celebrating_value ||
      !celebration_moment ||
      !image ||
      !from_user_id ||
      !to_user_id
    ) {
      return res.status(400).send("Please fill all the fields");
    }
    const transaction = await transactionSchema.create({
      from,
      from_user_id,
      to,
      to_user_id,
      celebrating_value,
      celebration_moment,
      image,
    });

    await updateProfile(from_user_id, to_user_id, celebration_moment);

    res.status(200).send("Transaction Successful");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = { getAllTransactions, makeTransaction };
