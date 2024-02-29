const jwt = require("jsonwebtoken");
const secret = "12345";

function getToken(user){ 
  const payload = {
     "id" : user._id,
     "name": user.name,
     "profilePic":user.profilePicUrl,
     "role":user.role
  }

    return jwt.sign(payload,secret);
}  


function verifyUser(token){
    return jwt.verify(token,secret);
} 

module.exports = {getToken,verifyUser};