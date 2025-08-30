const mongoose = require('mongoose');
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

const user = mongoose.model('user',userSchema);

module.exports = user;