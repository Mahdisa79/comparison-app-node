const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 256,
  }
},{timestamps:true});



const User = mongoose.model("User", userSchema);

module.exports = User;
