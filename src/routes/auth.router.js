const router = require("express").Router();
const {register} = require("../controllers/auth.controller")
const {login} = require("../controllers/auth.controller")

const registerValidate = require("../middlewares/validation.middelware.js").registerValitate;
const loginValidate = require("../middlewares/validation.middelware.js").loginValitate;

router.post("/register",registerValidate, register);

router.post("/login",loginValidate, login)


module.exports = router


