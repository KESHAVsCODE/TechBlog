const express = require("express");
const router = express.Router();

const { createBlog } = require("../controllers/blogController");
const { checkUserLogin } = require("../middleware/auth");

router.post("/new", checkUserLogin, createBlog);

module.exports = router;
