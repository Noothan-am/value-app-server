const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongoose connected succesfully");
  })
  .catch((error) => {
    console.error("connection error:", error.message);
  });
