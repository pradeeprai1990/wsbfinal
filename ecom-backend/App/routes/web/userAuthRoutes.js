let express=require("express")
let userAuthRoures=express.Router()
const multer = require('multer');
const { userCreate, checkOTP, login } = require("../../controllers/web/userAuthContoller");
let upload=multer({storage:''})
userAuthRoures.post('/register',upload.none(),userCreate)
userAuthRoures.post('/check-otp',upload.none(),checkOTP)

userAuthRoures.post('/login',upload.none(),login)
module.exports={userAuthRoures}