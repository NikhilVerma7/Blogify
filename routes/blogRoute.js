const express = require("express");
const Blog = require("../models/blog-model");
const multer  = require('multer');
const path = require("path");


const router = express.Router();  

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, path.resolve("./public"));
   },
   filename: function (req, file, cb) {
      const Filename = `${Date.now()}-${file.originalname}`;
      cb(null,Filename);
   }
 }) 

 const upload = multer({ storage: storage })


router.get("/",(req,res)=>{
   res.render("addBlog",{user : req.user});
}); 

router.get(`/:id`, async(req,res)=>{

   const blog = await Blog.findById(req.params.id);

   res.render("blog",{
      user: req.user,
      blog,
   })
})

router.post("/",upload.single('coverimage'), async (req,res)=>{
   
     const title = req.body.title;
     const body = req.body.body;
      

    const blog = await Blog.create({
      body,
      title,
      coverImageURL : `${req.file.filename}`,
      createdBy : req.user._id,
      
     });

   // console.log(req.body);

   res.redirect(`/`);

});

module.exports = router;