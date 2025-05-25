let express=require("express")
const { colorView, colorInsert, colorDelete } = require("../../controllers/admin/colorController")
let colorRoutes=express.Router()

colorRoutes.get('/view',colorView)

colorRoutes.post('/insert',colorInsert)

colorRoutes.post('/delete',colorDelete)

module.exports={colorRoutes}