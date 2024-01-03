const User = require("../models/userModel");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.create({ username, email, password });
    res
      .status(200)
      .json({ status: "success", message: "user created successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ status: "failed", message: "something went wrong!" });
  }
};

const login = (req, res) => {
  res.send("This is a login page");
};

const getProfile = (req, res) => {
  res.send("This is a profile page");
};

module.exports = { signup, login, getProfile };
