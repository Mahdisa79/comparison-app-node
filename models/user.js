const mongoose = require("mongoose");

const {userLoginSchemaValidation} = require('./validation/loginValidation');
const {userRegisterSchemaValidation} = require('./validation/registerValidation');
const uniqueString  = require('unique-string');
const bcrypt = require('bcrypt');

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
  },
  
  rememberToken : { type : String , default : null },

},{timestamps:true});


userSchema.pre('save' , function(next) {
  let salt = bcrypt.genSaltSync(15);
  let hash = bcrypt.hashSync(this.password , salt);

  this.password = hash;
  next();
});

userSchema.statics.loginValidation = function(body,req){

  return userLoginSchemaValidation.validate(body,{abortEarly:false})
}

userSchema.statics.registerValidation = function(body,req){

  return userRegisterSchemaValidation.validate(body,{abortEarly:false})
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password , this.password);
}

userSchema.methods.setRememberToken =  async function(res) {
  const token = uniqueString();
  res.cookie('remember_token' , token , { maxAge : 1000 * 60 * 60 * 24 * 90 , httpOnly : true , signed :true});

  console.log(this);
  // this.update({ rememberToken : token } , err => {
  //   if(err) console.log(err);
  // });
  await this.updateOne({ rememberToken : token });

}



const User = mongoose.model("User", userSchema);

module.exports = User;
