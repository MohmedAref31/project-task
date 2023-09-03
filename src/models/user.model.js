const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:6,
        maxlength:12
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        validate(v){
            const isEmail = validator.isEmail(v);

            if(!isEmail)
                throw new Error("please enter a valid email")
        }
    },
    password:{
        type:String,
        minlength:8,
        trim:true,
       
    }
})

userSchema.pre("save",async function (){
    let user = this ;
    if(user.isModified("password"))
        user.password = await bcrypt.hash(user.password, 8);
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel ;