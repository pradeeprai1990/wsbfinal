let express=require("express")
const { colorInsert, colorDelete } = require("../../controllers/admin/colorController")
const { materialInsert } = require("../../controllers/admin/materialControllers")
let materialRoutes=express.Router()

// materialRoutes.get('/view',materialView)

materialRoutes.post('/insert',materialInsert)

// materialRoutes.delete('/delete',materialDelete)

module.exports={materialRoutes}