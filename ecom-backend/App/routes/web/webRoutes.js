let express=require("express")
const { userAuthRoures } = require("./userAuthRoutes")
const { homePageRoutes } = require("./homePageRoutes")
const { cartRoutes } = require("./cartRoutes")
const { orderRoutes } = require("./orderRoutes")
let webRoutes=express.Router()

webRoutes.use("/user",userAuthRoures)
webRoutes.use("/home",homePageRoutes)
webRoutes.use("/cart",cartRoutes)
webRoutes.use("/order",orderRoutes)
module.exports={webRoutes}