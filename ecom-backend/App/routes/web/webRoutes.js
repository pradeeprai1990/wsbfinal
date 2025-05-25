let express=require("express")
const { userAuthRoures } = require("./userAuthRoutes")
let webRoutes=express.Router()

webRoutes.use("/user",userAuthRoures)


module.exports={webRoutes}