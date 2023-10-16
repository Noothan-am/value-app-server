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
  const { from, to, celebrating_value, celebration_moment, image } = req.body;
  if (!name || !celebrating_value || !celebration_moment || !image) {
    return res.status(400).send("Please fill all the fields");
  }
  try {
    const transaction = new transactionSchema.create({
      from,
      to,
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
