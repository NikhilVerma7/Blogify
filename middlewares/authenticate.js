const ok = require("../utils/auth"); 
const cookieParser = require('cookie-parser');

function checkforcookie(cookiename){
    return (req,res,next)=>{
       const tokenCookieValue = req.cookies.token;  
        // console.log(tokenCookieValue);
       if(!tokenCookieValue){ return next();} 

       try {
        const userpayload = ok.verifyUser(tokenCookieValue);
        req.user = userpayload; 
        // console.log(req.user);
       }
       catch(error){}

     return  next();
    }
}

module.exports = checkforcookie;