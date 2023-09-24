const router = require("express").Router();

const {isLogedin,logout} = require("../controllers/user.controller")

router.get("/isLogedin", isLogedin)
router.post('/logout',logout)


module.exports = router