const User = require("../models/userModel");

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

const getMyBlogs = async (req, res) => {
  try {
    const blogs = await User.findById(req.userId)
      .select({ blogs: 1 })
      .populate({ path: "blogs", model: "blogs" });
    res.status(200).json({ status: "success", data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = { getProfile, getMyBlogs };
