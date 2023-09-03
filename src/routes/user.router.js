const router = require("express").Router();

const register = require("../conorollers/register")



router.post("/user", register);



module.exports = router


