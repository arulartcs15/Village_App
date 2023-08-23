
const authorize=(req,res,next)=>{
    if(req.permittedRoles.includes(req.user.role)){
        next()
    }else{
        res.status(403).json({
            errors:'You are not authorized to access this route'
        })
    }
    }

    module.exports=authorize