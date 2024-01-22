const { model, Schema } = require("mongoose");

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  blog: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Blog",
  },
  message: {
    type: String,
    minLength: 6,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  isNested: {
    type: Boolean,
    default: false,
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Comment = model("comments", CommentSchema);

module.exports = Comment;
