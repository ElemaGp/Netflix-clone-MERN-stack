const jwt = require("jsonwebtoken")

function verify(req, res, next){
    const authHeader = req.headers.token;
    if (authHeader){
      const token = authHeader.split(" ")[1] //getting the token from the header

      jwt.verify(token, process.env.SECRET_KEY,(err, user)=>{ //verifying the token
        if(err){ 
          return res.status(403).json("Token is not valid"); //if there's an error verifying token
        }else if (req.user = user){ //if there's no error verifying token
        next();
      };
      })
    } else{
        return res.status(401).json("You are not authenticated"); //if there's no header
    }
}

module.exports = verify;