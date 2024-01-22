const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  updateMyBlog,
  getBlogDetails,
  deleteBlog,
  createComment,
  // deleteComment,
} = require("../controllers/blogController");
const { checkUserLogin } = require("../middleware/auth");

router.post("/create", checkUserLogin, createBlog);
router.delete("/delete/:blog_id", checkUserLogin, deleteBlog);
router.get("/all", checkUserLogin, getAllBlogs);
router.get("/my_blogs", checkUserLogin, getMyBlogs);
router.patch("/update/:blog_id", checkUserLogin, updateMyBlog);
router.get("/blog_details/:blog_id", checkUserLogin, getBlogDetails);
router.post("/comment/:blog_id", checkUserLogin, createComment);
// router.delete("/comment/:blog_id", checkUserLogin, deleteComment);

module.exports = router;
