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

module.exports = { createComment };
