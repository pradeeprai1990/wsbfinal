let express=require("express")
const { orderSave, verifyOrder } = require("../../controllers/web/oderController")
const { checkToken } = require("../../middleware/checkToken")

let orderRoutes=express.Router()

orderRoutes.post("/order-save", checkToken, orderSave)
orderRoutes.post("/verify-order", checkToken, verifyOrder)


module.exports={orderRoutes}