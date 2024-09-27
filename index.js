require("dotenv").config();
require("./connection/connection");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth-router");
const coinsRouter = require("./routes/coins-router");
const profileRouter = require("./routes/profile-router");
const transactionRouter = require("./routes/transaction-router");
const adminRouter = require("./routes/admin-router");
const mailRouter = require("./routes/mail-router");
const multer = require("multer");
const fs = require("fs");
const userInfo = require("./model/UserInfoSchema");
const moment = require("moment");
const { json } = require("body-parser");
const cron = require("node-cron");
const UserSchema = require("./model/UserInfoSchema");
const axios = require("axios");
var admin = require("firebase-admin");
var serviceAccount = require("./utils/serviceAccountKey.json");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    maxAge: 3600 * 24,
  })
);
app.use(authRouter);
app.use(coinsRouter);
app.use(profileRouter);
app.use(transactionRouter);
app.use(adminRouter);
app.use(mailRouter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (token, title, message) => {
  console.log("Sending notification to:", token);
  try {
    const response = await admin.messaging().send({
      token,
      notification: {
        title,
        body: message,
      },
    });
    console.log("Notification sent successfully:");
    return true;
  } catch (error) {
    await UserSchema.updateOne(
      { fcm_token: token },
      { $set: { fcm_token: "" } }
    );
    console.log("Token deleted from user database:", token);
    if (error?.code === "messaging/registration-token-not-registered") {
      console.error("Token is not registered. It might be invalid or expired.");
      return false;
    }
    if (error?.code === "messaging/third-party-auth-error") {
      console.log("Token is invalid or expired.");
      return false;
    } else {
      console.error("Error sending message:", error);
      return false;
    }
  }
};

cron.schedule("* * * * *", async () => {
  try {
    const users = await UserSchema.find({
      fcm_token: { $exists: true },
    });
    console.log("Users with FCM tokens:", users);
    if (users.length > 0) {
      for (const user of users) {
        if (user.fcm_token != "") {
          console.log("FCM token retrieved:", user.fcm_token);
          const sent = await sendNotification(
            user.fcm_token,
            `👋 Hey ${user.name}! It looks like you haven't used Trophic in a while.Jump back in and keep the momentum going! 🚀`,
            ""
          );
          if (sent) console.log(`Notifications sent to ${users.length} users`);
          else console.log("reset token happened");
        }
      }
    } else {
      console.log("No users found with FCM tokens");
    }
  } catch (error) {
    console.error(
      "Error retrieving FCM tokens or sending notifications:",
      error
    );
  }
});

const makeSlackMessageBlock = async () => {
  const allUserDetails = await UserSchema.find({
    "company.id": "62fafe5c-851b-4a06-a906-d60b1833cc9b",
  });
  if (!allUserDetails) {
    console.log("No users found");
    return;
  }
  const sortedUserDetails = allUserDetails.sort(
    (a, b) => b.total_coins - a.total_coins
  );
  const blockElements = sortedUserDetails.map(({ name, total_coins }) => {
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${name} - ${total_coins} coins*`,
      },
    };
  });

  const slackMessageBlock = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Week ${new Date()} Summary 🎉`,
      },
    },
  ];

  slackMessageBlock.push(...blockElements);
  return slackMessageBlock;
};

const handleSlackMessageTrigger = async () => {
  const block = await makeSlackMessageBlock();
  await axios.post(process.env.SLACK_API, {
    blocks: block,
  });
};

cron.schedule("0 10 30 * *", () => {
  handleSlackMessageTrigger()
    .then(() => {
      console.log("Summary Sent Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

const refreshCoins = async () => {
  try {
    const result = await UserSchema.updateMany({}, [
      {
        $set: {
          refreshed_coins: { $add: ["$refreshed_coins", "$total_coins"] },
          total_coins: 0,
        },
      },
    ]);
    console.log("Coins Refreshed Successfully!");
  } catch (err) {
    console.log("Could'nt Refresh Coins", err);
  }
};

cron.schedule("0 0 1 3,6,9,12 *", () => {
  refreshCoins()
    .then(() => {
      console.log("Coins Refreshed Successfully!");
    })
    .catch((err) => console.log("Could'nt Refresh Coins", err));
});

app.get("/", async (req, res) => {
  console.log("Hello World");
  return res.status(200).send("Hello World");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }
  const data = req.body.company;
  const company_data = JSON.parse(data);
  const newImage = new userInfo({
    image: {
      name: req.file.filename,
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype,
    },
    name: req.body.name,
    email: req.body.username,
    password: req.body.password,
    current_coins: 5,
    total_coins: 0,
    refreshed_coins: 0,
    tenacious: 0,
    resourceful: 0,
    open_minded: 0,
    problem_solving: 0,
    holistic: 0,
    inquisitive: 0,
    celebrating: 0,
    company: { ...company_data },
    reset_date: moment().format("DD-MM-YY"),
  });

  newImage.save((err, image) => {
    if (err) {
      return res.status(500).send(err);
    }
    fs.unlinkSync(req.file.path);
    res.status(200).send("Image uploaded successfully.");
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
