const jwt = require('jsonwebtoken')
const JWT_SECRET="admin"

const fetchAdmin=(req,res,next)=>{
    const token = req.header("AdminToken")
    if(!token){
        res.status(401).send({error:"Access denied! No token provided"})
    }
    try{
        const data=jwt.verify(token,JWT_SECRET)
        console.log("admin id:",data);
        req.admin=data
        next()
    }
    catch(err){
        res.status(403).send({message:"Invalid Token!!"})
    }
}
module.exports=fetchAdmin