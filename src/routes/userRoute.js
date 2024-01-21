const express = require("express");
const router = express.Router();

const { signup, login, getProfile } = require("../controllers/userController");
const { checkUserLogin } = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", checkUserLogin, getProfile);
module.exports = router;
