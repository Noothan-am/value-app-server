const axios = require("axios");
const triggerSlackMessage = async (req, res) => {
  try {
    const blocks = req.body;
    await axios.post(process.env.SLACK_API, {
      blocks: blocks,
    });
    res.status(200).json({ message: "message sent successfully" });
  } catch (e) {
    console.error("error from server side", e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { triggerSlackMessage };
