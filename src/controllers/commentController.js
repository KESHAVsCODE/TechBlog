const Comment = require("../models/commentModel");
const Blog = require("../models/blogModel");

const createComment = async (req, res) => {
  const blogId = req.params.blog_id;
  const userId = req.userId;
  const { message } = req.body;
  if (!message)
    res.status(400).json({ status: "failed", message: "message is required" });
  try {
    const comment = await Comment.create({
      user: userId,
      blog: blogId,
      message,
    });

    await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });
    console.log(comment);
    res.status(200).json({ status: "success", data: "comment has been added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const deleteComment = async (req, res) => {
  const blogId = req.params.blog_id;
  const commentId = req.params.comment_id;
  const userId = req.userId;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ status: "failed", message: "comment not found" });
    }
    if (!comment.user.equals(userId)) {
      return res.status(401).json({
        status: "failed",
        message: "you are not authorized to delete this comment",
      });
    }
    await Blog.findByIdAndUpdate(blogId, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    res
      .status(200)
      .json({ status: "success", message: "comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = { deleteComment };

module.exports = { createComment };
