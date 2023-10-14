require("dotenv").config();
const express = require("express");
require("./connect/connection");

const router = require("./routes/userRouter");
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(router);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
