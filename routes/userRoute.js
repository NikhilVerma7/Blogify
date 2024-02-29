const express = require("express");
const user = require("../models/user-model");
const {createHmac,randomBytes} = require("crypto"); 
const auth = require("../utils/auth");
const router = express.Router();


router.get("/signin", (req,res)=>{
   return res.render("signin");
});

router.get("/signup", (req,res)=>{
    return res.render("signup");
 }); 

 router.post("/signup", async(req,res)=>{
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
     await user.create({
        "name" : name,
        "email" : email,
        "password":password,
     }); 
     console.log('done');
     return res.redirect("/");
 });

 router.post("/signin",async(req,res)=>{
   // const{email,password} = req.body;  
   const findemail = req.body.email;
   const password = req.body.password;

     const checkUser = await user.findOne({email :findemail});
     console.log('hi');
     if(!checkUser) res.json("Invalid User");

     const existingpassword = checkUser.password;
     const salt = checkUser.salt

     const comparePassword = createHmac('sha256',salt).update(password).digest('hex'); 
     
    
     if(existingpassword != comparePassword)res.render("signin",{error :" Incorrect Email or Password"});
     
     // getting the token 

     else{
        const usertoken = auth.getToken(checkUser);
        res.cookie("token",usertoken).redirect("/");
     }
 });

 router.get("/logout",(req,res)=>{
      res.clearCookie('token').redirect("/");
 })

module.exports = router;