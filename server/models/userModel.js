const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
  email: String,
  password: String,
  date: [String],
  restaurant: [String]
});

const User = mongoose.model("User", users);

module.exports = User;
