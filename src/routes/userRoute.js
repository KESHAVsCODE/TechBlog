const express = require("express");
const router = express.Router();

const { signup, login, getProfile } = require("../controllers/userController");

router.get("/signup", signup);
router.post("/login", login);
router.post("/profile", getProfile);

module.exports = router;
