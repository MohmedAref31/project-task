const bcrypt = require("bcryptjs");

const User = require("../models/user.model")




const register = async function (req, res){
    try{
        const user =  new User(req.body);

            

            user.save()
                .then(e=>res.send(user))
                .catch(e=>res.status(400).send(e.message))

    }catch(e){
        res.send(e)
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

        res.cookie("token",token,{
            httpOnly:true
        }).send( token)

    }catch(e){
        console.log(e)
        res.send(e.message)
    }
}


module.exports = {
    register,
    login
}