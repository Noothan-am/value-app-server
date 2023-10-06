const express = require("express");
const {
  Api,
  Home,
  Login,
  Profile,
  SendCoins,
} = require("./controllers/controller");

const app = express();
const port = 3000 || process.env.PORT;

app.get("/", Home);

app.get("/api", Api);

app.get("/login", Login);

app.get("/sendcoins", SendCoins);

app.get("/profile", Profile);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
