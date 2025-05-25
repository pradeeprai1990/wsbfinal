const { adminModel } = require("../../models/adminModel");

let adminLogin=async (req,res)=>{
    let {username,password}=req.body;
    let data=await adminModel.findOne({admin_username:username,admin_password:password})
    let obj
    if(data){
        obj={
            status:1,
            data
        }  
    }
    else{
        obj={
            status:0,
            msg:"Invalid userName or Password"
        }  
    }

    res.send(obj)
}

let changePassword=async (req,res)=>{
    let {currentPassword,newPassword}=req.body;
    let {adminid}=req.params;
    let obj;
    let checkOld=await adminModel.findOne({_id:adminid,admin_password:currentPassword})
    if(checkOld){
         //Update
        let chnagePass= await adminModel.updateOne({_id:adminid},{$set:{ admin_password:newPassword }})
        obj={
            status:1,
            msg:"Password Chnage",
            chnagePass
        }  
        
    }
    else{
        obj={
            status:0,
            msg:"Invalid Old Password"
        }  
    }
    
    res.send(obj)
}

module.exports={adminLogin,changePassword}