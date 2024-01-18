const jwt = require("jsonwebtoken");
const checkUserLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(403)
      .json({ status: "failed", message: "missing authorization token" });
  }
  const token = authorization.split(" ")[1];
  try {
    const userInfo = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    console.log("userInfo", userInfo);
    req.userId = userInfo.id;
    next();
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ status: "failed", message: error.message });
  }
};

module.exports = { checkUserLogin };
