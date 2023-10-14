require("dotenv").config();
require("./connect/connection");
const express = require("express");
const authRouter = require("./routes/auth-router");
const profileRouter = require("./routes/profile-router");
const transactionRouter = require("./routes/transaction-router");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(authRouter);
app.use(profileRouter);
// app.use(transactionRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
