const Home = (req, res) => {
  res.send("Hello World!");
};

const Api = (req, res) => {
  res.send("API!");
};

const Login = (req, res) => {
  res.send("Login");
};

const SendCoins = (req, res) => {
  res.send("SendCoins");
};

const Profile = (req, res) => {
  res.send("Profile!");
};

module.exports = { Home, Api, Login, SendCoins, Profile };
