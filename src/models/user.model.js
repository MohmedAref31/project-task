const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

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
       
    },
    tokens:[{
        type:String
    }]
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
        throw new Error("email is wrong");

    const compare  = await bcrypt.compare(password, user.password);

    if(!compare)
        throw new Error("password is wrong")

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