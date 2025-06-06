let express=require("express")
const { checkToken } = require("../../middleware/checkToken")
const { addtoCart, showCart } = require("../../controllers/web/cartController")

let cartRoutes=express.Router()


cartRoutes.post('/addtocart',checkToken,addtoCart)
cartRoutes.post('/cartlist',checkToken,showCart)


module.exports={cartRoutes}