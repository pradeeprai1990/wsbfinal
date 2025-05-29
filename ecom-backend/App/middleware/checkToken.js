let jwt = require('jsonwebtoken');

let checkToken=(req,res,next)=>{
  
    let obj
    try{
        let token=req.headers.authorization.split(" ")[1]

        var decoded = jwt.verify(token,process.env.TOKENKEY );
        req.body.id=decoded.id
        next()
      
    }
    catch(error){
        obj={
            status:0,
            msg:"Please fill The  Valid Token"
        }
        return   res.send(obj)
    }
}

module.exports={checkToken}