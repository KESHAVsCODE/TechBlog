const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = model("users", UserSchema);

module.exports = User;
