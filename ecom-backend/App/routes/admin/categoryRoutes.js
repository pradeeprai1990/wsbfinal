let express=require("express")
let path=require("path")
const multer = require('multer');
const { categoryInsert, categoryView, changeStatus, editRowData, categoryUpdate } = require("../../controllers/admin/categoryController")
let categoryRoutes=express.Router()

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/category")
    }, //Upload
    filename: function (req, file, cb) { //return d 
      cb(null, Date.now()+file.originalname);
    }
  });
  
  
  const upload = multer({ storage:storage })
// categoryRoutes.get('/view',categoryView)

categoryRoutes.post('/insert',upload.single('categoryImage'),categoryInsert)


categoryRoutes.get('/view',categoryView)

categoryRoutes.put('/change-status/:id',changeStatus)

categoryRoutes.get('/edit-row-data/:id',editRowData)

categoryRoutes.put('/update/:id',upload.single('categoryImage'),categoryUpdate)
// categoryRoutes.delete('/delete',categoryDelete)

module.exports={categoryRoutes}