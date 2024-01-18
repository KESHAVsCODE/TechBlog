const express = require("express");
const router = express.Router();

const { createBlog } = require("../controllers/blogController");

router.post("/new", createBlog);

module.exports = router;
