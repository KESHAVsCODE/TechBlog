const express = require("express");
const app = express();

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");
const commentRouter = require("./routes/commentRoute");

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);

module.exports = app;
