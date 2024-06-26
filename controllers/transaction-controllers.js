const moment = require("moment");
const axios = require("axios");
const transactionSchema = require("../model/TransactionSchema");
const userInfoSchema = require("../model/UserInfoSchema");

const getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.body;
    const allTransactionDetails = await transactionSchema.find({
      to_user_id: userId,
    });
    if (!allTransactionDetails) {
      return res.status(400).send("No one has done any transaction yet");
    }

    let transactionDetails = allTransactionDetails
      .map(
        ({
          from,
          to,
          to_user_id,
          celebrating_value,
          celebration_moment,
          date,
          has_seen,
          diff,
          image,
        }) => ({
          from,
          to,
          to_user_id,
          celebrating_value,
          celebration_moment,
          date,
          has_seen,
          diff,
          image,
        })
      )
      .reverse();
    res.send(transactionDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const { company_id } = req.body;
    const allTransactionDetails = await transactionSchema.find({
      "company.id": company_id,
    });
    if (!allTransactionDetails) {
      return res.status(400).send("No one has done any transaction yet");
    }

    let transactionDetails = allTransactionDetails
      .map(
        ({
          from,
          to,
          to_user_id,
          celebrating_value,
          celebration_moment,
          date,
          image,
          company,
        }) => ({
          from,
          to,
          to_user_id,
          celebrating_value,
          celebration_moment,
          date,
          image,
          company,
        })
      )
      .reverse();
    if (transactionDetails.length > 20) {
      transactionDetails = transactionDetails.slice(0, 20);
    }
    res.status(200).send(transactionDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const updateProfile = async (fromId, toId, celebration_moment) => {
  try {
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
    return true;
  } catch (error) {
    console.log("error while updating profile", error);
    return false;
  }
};

const makeTransaction = async (req, res) => {
  let {
    from,
    to,
    celebrating_value,
    celebration_moment,
    image,
    to_user_id,
    from_user_id,
    company,
  } = req.body;
  console.log(
    from,
    to,
    celebrating_value,
    celebration_moment,
    image,
    to_user_id,
    from_user_id,
    company
  );
  if (
    !from ||
    !to ||
    !celebrating_value ||
    !celebration_moment ||
    !image ||
    !from_user_id ||
    !to_user_id ||
    !JSON.parse(company)
  ) {
    console.log("here");
    return res.status(400).send("Please fill all the fields");
  }
  let moment =
    celebration_moment === "open_minded"
      ? "Open-Minded"
      : celebration_moment === "problem_solving"
      ? "Problem-Solving"
      : celebration_moment.slice(0, 1).toUpperCase() +
        celebration_moment.slice(1, celebration_moment.length);

  try {
    const transaction = new transactionSchema({
      from,
      from_user_id,
      to,
      to_user_id,
      celebrating_value,
      celebration_moment: moment,
      company: JSON.parse(company),
      image: JSON.parse(image),
    });

    await transaction.save();

    const result = await updateProfile(
      from_user_id,
      to_user_id,
      celebration_moment
    );

    if (result) {
      moment =
        celebration_moment === "open_minded"
          ? "Open-Minded"
          : celebration_moment === "problem_solving"
          ? "Problem-Solving"
          : celebration_moment.slice(0, 1).toUpperCase() +
            celebration_moment.slice(1, celebration_moment.length);

      const randomGifLinks = [
        "https://media.giphy.com/media/DKnMqdm9i980E/giphy.gif",
      ];

      const blocks = [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Congratulations 🎉*",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${from}* celebrated *${to}* for being *${moment}*`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `\`${celebrating_value}\``,
          },
        },
        {
          type: "image",
          image_url: `${randomGifLinks[0]}`,
          alt_text: "GIF Alt Text",
        },
      ];

      await axios.post(process.env.SLACK_API, {
        blocks: blocks,
      });
      res.status(200).send("Transaction Successful");
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { userId } = req.body;
    await transactionSchema.updateMany(
      { to_user_id: userId },
      { $set: { has_seen: true } }
    );
    res.status(200).send("Successfully updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

const getValues = async (req, res) => {
  try {
    let { from_user_id, to_user_id } = req.body;
    const allTransactionDetails = await transactionSchema.find({
      from_user_id,
      to_user_id,
    });

    if (!allTransactionDetails || allTransactionDetails.length === 0) {
      return res.status(200).send([]);
    }

    let current_date = moment(moment().format("MM-YYYY"), "MM-YYYY");
    const values = allTransactionDetails.map((transaction) => {
      let date_to_check = moment(transaction.diff, "MM-YYYY");
      const difference = current_date.diff(date_to_check, "months");
      if (difference <= 0) {
        return transaction.celebration_moment;
      }
    });
    return res.status(200).send(values);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  getValues,
  getUserTransactions,
  makeTransaction,
  getAllTransactions,
  updateTransaction,
};
