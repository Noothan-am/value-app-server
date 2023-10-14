const userInfoSchema = require("../model/TransactionSchema");

const userLogin = async (req, res) => {
  const result = await JSON.parse(req.body);
  const { email, password } = result;
  res.send({ email, password });
};

module.exports = { userLogin };
