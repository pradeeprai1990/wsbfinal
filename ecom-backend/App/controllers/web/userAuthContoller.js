const { transporter } = require("../../config/mailConfig");
const { userModel } = require("../../models/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 10;
let myOTP=new Map();
let userCreate=async (req,res)=>{

    let {email,phone,password}=req.body;


    let obj={
        userEmail:email,
        userPhone:phone,
        userPassword:password
    }
    let ResObj;
    try{

        let otp=String(Math.floor(Math.random()*9999)).slice(0,4)

        myOTP.set("otp",otp) //backend Store


        // let user=await userModel(obj)
        // let userRes= await user.save()
        const info = await transporter.sendMail({
            from: '"OTP Mail" <pradeep.9997@gmail.com>',
            to: email,
            subject: "OTP Mail",
            text: "", // plain‑text body
            html: `<b>OTP</b> ${  otp } `, // HTML body //Mail
          });
        

        ResObj ={
            status:1,
            msg:"OTP SEND",
            // userRes
        }
    }
    catch(error){
      
        ResObj={
            status:0,
            msg:"Email Id Already Exist..",
            
        }
    }
    finally{
        res.send(ResObj)
    }
    
}


let checkOTP=async (req,res)=>{
    let {email,phone,password,otp}=req.body;
    const hash = bcrypt.hashSync(password, saltRounds); //

    let storeOTP= myOTP.get("otp") //backend Store
    let obj={
        userEmail:email,
        userPhone:phone,
        userPassword:hash
    }
    if(storeOTP==otp){
       let user=await userModel(obj)
        let userRes= await user.save()  
        let resObj={
            status:1,
            mgs:"user created",
            userRes
        }
        res.send(resObj)
    }
    else{
        res.send({status:0,msg:"OTP Faild"})
    }

    
}

let login=async (req,res)=>{
    let {email,password}=req.body;

    //Check Email
    let userEmail=await userModel.findOne({userEmail:email})
    let resObj;
    if(userEmail){
      

        let myDBPassword=userEmail.userPassword

        let checkPassword= bcrypt.compareSync(password, myDBPassword); // true
        if(checkPassword){
            resObj={
                status:1,
                userData:userEmail
            }
        }

        else{
            resObj={
                status:0,
                 mgs:"Invalid Passwword...."
            }
        }
       
    }
    else{
        resObj={
            status:0,
            mgs:"Invalid Email ID...."
        }
    }

    res.send(resObj)

}

module.exports={userCreate,checkOTP,login}