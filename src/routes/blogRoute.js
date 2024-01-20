const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  updateMyBlog,
} = require("../controllers/blogController");
const { checkUserLogin } = require("../middleware/auth");

router.post("/new", checkUserLogin, createBlog);
router.get("/all", checkUserLogin, getAllBlogs);
router.get("/myblogs", checkUserLogin, getMyBlogs);
router.patch("/update/:blog_id", checkUserLogin, updateMyBlog);

module.exports = router;
