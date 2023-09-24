const User = require("../models/user.model")
const jwt  = require ("jsonwebtoken")


const userCtl = {
    isLogedin:async(req,res)=>{
        const {token} = req.cookies;
        

        if(!token)
            return res.send(false)

     await jwt.verify(token
      ,process.env.JWT,(e)=>{
        if(e)
        return res.send(false)
        res.send(true)
      })
    
      
    },
    logout:async(req, res)=>{
        try{
            res.clearCookie("token")
                .send("logout success")    
        }catch(e){
            res.status(500).send({message:e.message})
        }
    }
}


module.exports = userCtl