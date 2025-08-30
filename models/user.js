const { assert } = require('console');
const mongoose = require('mongoose');
const {createHmac ,randomBytes} = require('crypto')
const { type } = require('os');

const userSchema = new mongoose.Schema({

   fullname:{
    type:String,
    required:true
   } ,
   email:{
     type:String,
    required:true,
    unique:true
   },
   salt:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   ProfilePictureURL:{
    type:String,
    default:"/public/images/basic-avatar.avif"
   },
   roles:{
    type:String,
    enum:["USER","ADMIN"],
    default:"USER"
   }


},{timestamps:true});
userSchema.pre('save', async function (next) {
    const user = this;
      if (!user.isModified('password')) { 
            return next();
      }
      const salt = randomBytes(16).toString();
      const hashedPassword = createHmac('sha256' , salt).update(user.password).digest("hex");

      this.salt = salt;
      this.password = hashedPassword
      next();
})

const user = mongoose.model('user',userSchema);

module.exports = user;