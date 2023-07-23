const mongoose = require("mongoose");

const {userLoginSchemaValidation} = require('./validation/loginValidation');
const {userRegisterSchemaValidation} = require('./validation/registerValidation');
const uniqueString  = require('unique-string');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
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

userSchema.statics.loginValidation = function(body,req){

  return userLoginSchemaValidation.validate(body,{abortEarly:false})
}

userSchema.statics.registerValidation = function(body,req){

  return userRegisterSchemaValidation.validate(body,{abortEarly:false})
}

// userSchema.methods.comparePassword = function(password) {
//   return bcrypt.compareSync(password , this.password);
// }

userSchema.methods.setRememberToken = function(res) {
  const token = uniqueString();
  res.cookie('remember_token' , token , { maxAge : 1000 * 60 * 60 * 24 * 90 , httpOnly : true , signed :true});
}



const User = mongoose.model("User", userSchema);

module.exports = User;
