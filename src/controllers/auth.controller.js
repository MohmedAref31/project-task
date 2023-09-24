const bcrypt = require("bcryptjs");

const User = require("../models/user.model")




const register = async function (req, res){
    try{

        const {email} = req.body
        const isExist = await User.findOne({email})

        if(isExist)
            throw new Error("Email is already used")

        const user =  new User(req.body);

            
            user.save()
                .then(e=>res.send(user))
                .catch(e=>res.status(400).send({message:e.message}))

    }catch(e){
        res.status(400).send({message:e.message})
    }
}







const login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        // console.log(email, password)
        const user = await User.login(email, password);
        if(!user)
            throw new Error("not a user")

        const token = await user.generateToken(user._id)
        delete user.tokens
        delete user.password

        await user.save()
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:1000 * 60 * 60 * 24 
        }).send( user)

    }catch(e){
        console.log(e)
        res.status(400).send({message:e.message})
    }
}


module.exports = {
    register,
    login
}