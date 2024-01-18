const express = require("express");
const app = express();
const userRouter = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");

app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/blog", blogRoute);

module.exports = app;
