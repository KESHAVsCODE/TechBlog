const express = require("express");
const router = express.Router();

const { getProfile, getMyBlogs } = require("../controllers/userController");

const { checkUserLogin } = require("../middleware/auth");

router.get("/profile", checkUserLogin, getProfile);
router.get("/my_blogs", checkUserLogin, getMyBlogs);
module.exports = router;
