const User = require("../models/user.model");


const register = async function (req, res, next){
        try{
            const user =  new User(req.body);

                

                user.save()
                    .then(e=>res.send(user))
                    .catch(e=>res.status(400).send(e.message))

        }catch(e){
            res.send(e.message)
        }
}

module.exports = register