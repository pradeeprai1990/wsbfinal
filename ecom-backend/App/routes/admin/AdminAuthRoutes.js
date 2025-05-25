let express=require("express")
const { adminLogin, changePassword } = require("../../controllers/admin/AdminAuthController")

let adminAuthRoutes=express.Router()


adminAuthRoutes.post('/login',adminLogin)
adminAuthRoutes.post('/chnage-password/:adminid',changePassword)
module.exports={adminAuthRoutes}