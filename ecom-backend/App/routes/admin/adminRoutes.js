let express=require("express")
const { colorRoutes } = require("./colorRoutes")
const { sizeRoutes } = require("./sizeRoutes")
const { materialRoutes } = require("./materialRoutes")
const { categoryRoutes } = require("./categoryRoutes")
const { subcategoryRoutes } = require("./subCategoryRoutes")
const { subSubcategoryRoutes } = require("./subSubCategoryRoutes")
const { adminAuthRoutes } = require("./AdminAuthRoutes")
const { productRoutes } = require("./productRoutes")

let adminRoutes=express.Router()

adminRoutes.use("/color",colorRoutes)
adminRoutes.use("/size",sizeRoutes)
adminRoutes.use("/material",materialRoutes)
adminRoutes.use("/category",categoryRoutes)
adminRoutes.use("/subcategory",subcategoryRoutes)

adminRoutes.use("/sub-subcategory",subSubcategoryRoutes)


adminRoutes.use("/auth",adminAuthRoutes)
adminRoutes.use("/product",productRoutes)


module.exports={adminRoutes}