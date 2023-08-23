const jwt =require('jsonwebtoken')
require('dotenv').config()
const userAuthenticate = (req,res,next)=>{
   const token = req.header('authorization').split(' ')[1]
   const verifyToken = jwt.verify(token,process.env.SECRET_KEY)
   if(verifyToken){
        const userData = {
            id:verifyToken.id,
            role:verifyToken.role
        }
        req.user =userData
        next()
  }
  else{
    res.json({
        errors:"Invalid Token"
    })
  }

}

module.exports = userAuthenticate