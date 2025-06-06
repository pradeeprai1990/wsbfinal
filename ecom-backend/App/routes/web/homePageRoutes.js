let express=require("express")
const { bestsellingProducts } = require("../../controllers/web/homepageContoller")
let homePageRoutes=express.Router()

//Slider

//http://localhost:8120/web/home/bestselling-products
homePageRoutes.get('/bestselling-products',bestsellingProducts)


module.exports={homePageRoutes}