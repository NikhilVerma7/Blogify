const express = require("express");
const app = express();
const path = require("path");   
const UserRoute = require('./routes/userRoute');
const BlogRoute = require('./routes/blogRoute');
const cookieParser = require('cookie-parser');
const checkforcookie = require("./middlewares/authenticate");
const blog = require("./models/blog-model");
const mongoose = require("mongoose"); 

mongoose.connect('mongodb://127.0.0.1:27017/blogify').then((e)=>console.log("MongoDB connected !!!!"));

app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(checkforcookie("token"));
app.use(express.static(path.resolve("./public")));

app.get('/', async(req,res)=>{
    const allblogs = await blog.find({});
    res.render("home",{
         user : req.user,
         blogs : allblogs
        });
});

app.use('/user', UserRoute);
app.use('/addBlog', BlogRoute);

app.listen('3000', ()=>{console.log('Server is running !!!')});