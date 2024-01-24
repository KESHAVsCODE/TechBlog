const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const createBlog = async (req, res) => {
  const { title, description, imageUrl, tag } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      status: "failed",
      message: "title and description are required",
    });
  }

  try {
    const user = await User.findById(req.userId);

    const blog = await Blog.create({
      title,
      description,
      user: req.userId,
      userName: user.userName,
      tag,
      imageUrl,
    });

    await User.findByIdAndUpdate(req.userId, { $push: { blogs: blog._id } });

    res.status(200).json({ status: "success", data: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.blog_id;
  try {
    const blog = await Blog.findById(blogId);

    if (!blog.user.equals(req.userId)) {
      return res.status(401).json({
        status: "failed",
        message: "you are not authorized to delete this blog",
      });
    }
    //first delete all comments that are associated with this blog
    await Comment.deleteMany({ _id: { $in: blog.comments } });
    await Blog.findByIdAndDelete(blogId);
    res
      .status(200)
      .json({ status: "success", message: "blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ status: "success", data: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const updateMyBlog = async (req, res) => {
  const { title, description, imageUrl, tag } = req.body;

  const blogId = req.params.blog_id;

  if (!title && !description && !imageUrl && !tag) {
    return res
      .status(400)
      .json({ status: "failed", message: "no updates provided" });
  }

  const updatedValues = {
    ...(title && { title }),
    ...(description && { description }),
    ...(imageUrl && { imageUrl }),
    ...(tag && { tag }),
  };
  const query = { _id: blogId };
  const update = { $set: updatedValues };

  try {
    const blog = await Blog.findById(blogId);
    if (!blog.user.equals(req.userId)) {
      return res.status(401).json({
        status: "failed",
        message: "you are not authorized to update this blog",
      });
    }
    await Blog.updateOne(query, update);
    res
      .status(200)
      .json({ status: "success", message: "blog updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getBlogDetails = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blog_id).populate({
      path: "comments",
      model: "comments",
    });
    res.status(200).json({ status: "success", data: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const vote = async (req, res) => {
  const { vote } = req.query;
  const blogId = req.params.blog_id;
  const userId = req.userId;
  if (!vote)
    res.status(400).json({ status: "failed", message: "vote is required" });

  const query = { _id: blogId };
  let update;

  if (vote === "upVote" || vote === "downVote") {
    update = {
      $inc: { [vote]: 1 },
      $addToSet: { votedBy: userId },
    };
  } else {
    return res
      .status(400)
      .json({ status: "failed", message: "invalid vote type" });
  }

  try {
    await Blog.updateOne(query, update);
    res.status(200).json({ status: "success", data: "voting successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateMyBlog,
  getBlogDetails,
  vote,
};
