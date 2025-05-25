let express=require("express")
const { sizeView, sizeInsert, sizeDelete } = require("../../controllers/admin/sizeController")
let sizeRoutes=express.Router()

sizeRoutes.get('/view',sizeView)

sizeRoutes.post('/insert',sizeInsert)

sizeRoutes.delete('/delete',sizeDelete)

module.exports={sizeRoutes}