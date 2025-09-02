const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true});

const comment = mongoose.model("Comment",commentSchema);

module.exports = comment;