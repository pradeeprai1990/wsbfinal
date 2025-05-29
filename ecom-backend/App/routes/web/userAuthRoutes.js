let express=require("express")
let userAuthRoures=express.Router()
const multer = require('multer');
const { userCreate, checkOTP, login, changePassword } = require("../../controllers/web/userAuthContoller");
const { checkToken } = require("../../middleware/checkToken");
let upload=multer({storage:''})
userAuthRoures.post('/register',upload.none(),userCreate)
userAuthRoures.post('/check-otp',upload.none(),checkOTP)

userAuthRoures.post('/login',upload.none(),login)

userAuthRoures.post('/change-password',checkToken, changePassword)
module.exports={userAuthRoures}