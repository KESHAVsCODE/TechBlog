const { Schema, model } = require("mongoose");

const BlogSchema = new Schema({
  title: { type: String, required: true, minLength: 3 },
  description: { type: String, required: true, minLength: 3 },
  tag: { type: [String], default: ["General"], minLength: 3 },
  imageUrl: { type: String, default: "" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  userName: String,
  upVote: Number,
  downVote: { type: Number, min: 0 },
  votedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  //   comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});
// Username: (String)
// Upvote: (Number)
// Downvote: (Number)
// Voted By: (Array of user references who voted on this blog)
// Comments: (Array of comment references)

const Blog = model("blogs", BlogSchema);

module.exports = BlogModel;
