const router = require("express").Router();

const {createBlog, updateBlog, deleteBlog, getBlogs,getBlogById,getAllBlogs} = require("../controllers/blog.controller");
const { authentication, authourization } = require("../middlewares/verfy.middlewares");

const upload = require("../utils/upload.utils")

router.get("/allBlogs",authourization,getAllBlogs)

router.use(authentication)
router.post("/",upload.single("image"),createBlog)
router.get("/",getBlogs)
router.get("/:id",getBlogById)
router.patch("/:id",upload.single("image"),updateBlog)
router.delete("/:id",deleteBlog)











module.exports = router