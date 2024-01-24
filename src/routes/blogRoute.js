const express = require("express");
const router = express.Router();

const {
  createBlog,
  updateMyBlog,
  getAllBlogs,
  getBlogDetails,
  deleteBlog,
} = require("../controllers/blogController");
const { checkUserLogin } = require("../middleware/auth");

//fetch all blogs
router.get("/", getAllBlogs);

//create a new blog
router.post("/", checkUserLogin, createBlog);

//delete a blog
router.delete("/:blog_id", checkUserLogin, deleteBlog);

//update a existing blog
router.patch("/:blog_id", checkUserLogin, updateMyBlog);

//fetch a particular blog details
router.get("/:blog_id", checkUserLogin, getBlogDetails);

module.exports = router;
