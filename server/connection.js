const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongoose connected succesfully");
  })
  .catch((e) => {
    console.log(e);
  });
