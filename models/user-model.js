const mongoose = require("mongoose");
const {createHmac,randomBytes} = require("crypto");

const userschema = new mongoose.Schema(
    {
       name : {
        type : String,
        required : true
       },
       email : {
        type : String,
        required : true,
         unique : true
       },
       password : {
        type : String,
        required : true,
          
       },
      
       salt : {
        type : String,
        
       },
       profilePicUrl : {
        type : String,
        default : '../public/photos/defaultUser.png'
       },
       role :{
        type : String,
        enum : ["USER","ADMIN"],
        default: "USER" ,
       }

    },
    {timestamps : true}); 

    userschema.pre("save", function(next){
        const user = this;
        if(!user.isModified("password")) return ; 
        const salt = randomBytes(16).toString();
        const HashedPassword = createHmac('sha256',salt).update(user.password).digest('hex');
        
        this.salt = salt;
        this.password = HashedPassword;

        next();
    })

    const user = new mongoose.model('user',userschema);

    module.exports = user;