const jwt = require("jsonwebtoken")
const User = require("../models/user.model");


const authentication = async(req,res, next)=>{

    try {
        const {token} = req.cookies;
        console.log(token)
        const verfy = await jwt.verify(token,process.env.JWT)
        if(!verfy)
            return res.status(401).send("not authenticated");

        const user = await User.findById(verfy._id);
      
        if(!user)
        return res.status(401).send("not authenticated");
//   console.log(user)

        req.user = user;
        req.token = token;
        next()
    } catch (e) {
        console.log(e)
        return res.status(401).send({message:e.message})
    }

}
const authourization = async(req,res,next)=>{

   
       authentication(req,res, async()=>{
            console.log(req.user)
            const {isAdmin} =await req.user
            console.log(isAdmin)
            if(!isAdmin)
                return res.status(403).send({message:"Not Allowed !"});
            next()
       })
   
}


module.exports = {
    authentication,
    authourization
}