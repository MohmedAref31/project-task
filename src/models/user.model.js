const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname :{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        trim:true,
       
    },
    tokens:[{
        type:String,
        expires:"1d"
    }],
    isAdmin:{
        type:Boolean,
        default:false
    }
})

userSchema.pre("save",async function (){
    let user = this ;
    if(user.isModified("password"))
        user.password = await bcrypt.hash(user.password, 8);
})

userSchema.statics.login = async (email , password)=>{
    console.log(email, password)

    const user = await userModel.findOne({email});

    console.log(user)
    if(!user)
        throw new Error("email or password is wrong");

    const compare  = await bcrypt.compare(password, user.password);

    if(!compare)
        throw new Error("email or password is wrong")

    return user
}

userSchema.methods.generateToken = async function (id){
    const user = this;
    const token = await jwt.sign({_id:id}, process.env.JWT) ;

    user.tokens = [...user.tokens, token];

    await user.save()

    return  token

}

const userModel = mongoose.model("User", userSchema)

module.exports = userModel ;