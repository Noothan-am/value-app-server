const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const sendMail = async (req, res) => {
  const { userName, userEmail, userMailMessage } = req.body;
  try {
    let service = {
      service: "gmail",
      auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.MAIL_PASS_KEY,
      },
    };

    const transport = nodemailer.createTransport(service);
    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Trophic",
        link: "https://mailgen.js/",
      },
    });

    const userMessage = {
      body: {
        name: userName,
        intro: "Trophic Coins Summary",
        outro: userMailMessage,
      },
    };

    const userMail = await MailGenerator.generate(userMessage);
    const userMailOptions = {
      from: process.env.ADMIN_MAIL,
      to: userEmail,
      subject: "Trophic",
      html: userMail,
    };

    transport
      .sendMail(userMailOptions)
      .then((response) => {
        return res.status(200).send({
          msg: "Messages sent successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({
          msg: "Messages not sent",
        });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendMail };
