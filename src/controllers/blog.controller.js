const Blog = require("../models/blog.model");

const deleteImage = require("../utils/deleteImage.utils")
const blogCtl = {
    createBlog:async(req, res)=>{
        try{
            console.log(req.token)
            const data = req.body;
            console.log(req.body)
          console.log(req.file)
            if(req.file){
                
                data.image ="/api/uploads/"   + req.file.filename
            }
                

        data.owner = req.user._id

        const blog = await  Blog.create(data)

        res.send(blog)

        }catch(e){
            // console.log(e)
            res.status(500).send({message:e.message})
        }
    },
    updateBlog:async(req, res)=>{
        try{
            const {id} = req.params
            const {title,description} = req.body;
            const blog = await Blog.findById(id);
            if(!blog)
                return res.status(404).send("blog not found")
            if(req.file){
                const oldImg = blog?.image?.split("/api/uploads/")[1]
                console.log(oldImg)
                if(oldImg)
                    deleteImage(oldImg)
                blog.image ="/api/uploads/"   + req.file.filename
            }
        blog.title = title;
        blog.description = description;
        await blog.save()
        res.send(blog)

        }catch(e){
            res.status(500).send({message:e.message})
        }
    },
    getBlogs:async(req, res)=>{
        try{
            const blogs = await Blog.find({owner:req.user._id});
            if(!blogs)
            return res.status(404).send({message:"there is no blogs"})    
            res.send(blogs)
        }catch(e){
            res.status(500).send({message:e.message})
        }
    },
    getAllBlogs:async(req, res)=>{
        try{
            const blogs = await Blog.find({});
            if(!blogs)
            return res.status(404).send({message:"there is no blogs"}) 
            // Blog.populate("owner")
           const x = blogs[0]
           x.populate({path:"owner",select:"fullname"})
            res.send(x)
        }catch(e){
            res.status(500).send({message:e.message})
        }
    },
    getBlogById:async(req, res)=>{
        try{
            const {id} = req.params
            const blog = await Blog.findById(id);
            if(!blog)
            return res.status(404).send({message:"there is no blogs"})    
            blog.populate("owner")
            res.send(blog)
        }catch(e){
            res.status(500).send({message:e.message})
        }
    },
    deleteBlog:async(req, res)=>{
        try{
            const {id} = req.params
            const blog = await Blog.findByIdAndDelete(id);
            console.log(blog)
            if(!blog)
                return res.status(404).send("blog not found")
             const oldImg = blog?.image?.split("/api/uploads/")[1]
                if(oldImg)
                    deleteImage(oldImg)
                
        res.send(blog)

        }catch(e){
            res.status(500).send({message:e.message})
        }
    }
}


module.exports = blogCtl