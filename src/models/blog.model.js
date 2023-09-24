const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    owner:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
    }
})





const Blog = mongoose.model("Blog",blogSchema)


module.exports = Blog