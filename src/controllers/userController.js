const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      userName,
      email,
      password: encryptedPassword,
    });
    res
      .status(200)
      .json({ status: "success", message: "user created successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "failed", message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "user not found!" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ status: "failed", message: "invalid password!" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
      process.env.SECRET_TOKEN_KEY,
      {
        expiresIn: "2d",
      }
    );
    res
      .status(200)
      .json({ status: "success", message: "login success.", token });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Something went wrong ${error.message}`,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) throw new Error("user not found!");
    res.status(200).json({
      status: "success",
      message: `Hello ${userData.userName}`,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({ status: "failed", message: error.message });
  }
};

module.exports = { signup, login, getProfile };
