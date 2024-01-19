const express = require("express");
const router = express.Router();

const { createBlog, getAllBlogs } = require("../controllers/blogController");
const { checkUserLogin } = require("../middleware/auth");

router.post("/new", checkUserLogin, createBlog);
router.get("/read", checkUserLogin, getAllBlogs);

module.exports = router;
