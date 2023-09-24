const router = require("express").Router();
const authRouter = require("./auth.router")
const userRouter = require("./user.router")
const blogRouter = require("./blog.route")


router.use("/auth",authRouter)
router.use("/user",userRouter)

router.use("/blog",blogRouter)

module.exports = router