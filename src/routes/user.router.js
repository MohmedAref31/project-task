const router = require("express").Router();
const {register} = require("../controllers/auth")
const {login} = require("../controllers/auth")

const registerValidate = require("../middlewares/validation.middelware.js").registerValitate;
const loginValidate = require("../middlewares/validation.middelware.js").loginValitate;

router.post("/user",registerValidate, register);

router.post("/login",loginValidate, login)


module.exports = router


