const transactionSchema = require("../model/TransactionSchema");

const getAllTransactions = async (req, res) => {
  try {
    const allTransactionDetails = await transactionSchema.find({});
    if (!allTransactionDetails) {
      return res.status(400).send("No one has done any transaction yet");
    }

    const transactionDetails = allTransactionDetails.map(
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
    );

    res.send(transactionDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
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
      console.log(from, to_user_id);
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
    res.status(200).send("Transaction Successful");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = { getAllTransactions, makeTransaction };
