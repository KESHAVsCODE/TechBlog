const express = require("express");
const router = express.Router();

const {
  createComment,
  // deleteComment,
} = require("../controllers/commentController");
const { checkUserLogin } = require("../middleware/auth");

router.post("/:blog_id", checkUserLogin, createComment);
// router.delete("/:blog_id", checkUserLogin, deleteComment);

module.exports = router;
