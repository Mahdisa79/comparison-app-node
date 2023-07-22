const mongoose = require("mongoose");

const {userLoginSchemaValidation} = require('./validation/loginValidation');
const {userRegisterSchemaValidation} = require('./validation/registerValidation');


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

userSchema.statics.loginValidation = function(body,req){

  return userLoginSchemaValidation.validate(body,{abortEarly:false})
}

userSchema.statics.registerValidation = function(body,req){

  return userRegisterSchemaValidation.validate(body,{abortEarly:false})
}

// userSchema.methods.comparePassword = function(password) {
//   return bcrypt.compareSync(password , this.password);
// }





const User = mongoose.model("User", userSchema);

module.exports = User;
