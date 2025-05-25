let express=require("express")
const multer = require('multer');
const { parentCategory,subcategoryInsert, subcategoryView } = require("../../controllers/admin/subCategoryController");
let subcategoryRoutes=express.Router()
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/subcategory")
    }, //Upload
    filename: function (req, file, cb) { //return d 
      cb(null, Date.now()+file.originalname);
    }
  });
  
  
const upload = multer({ storage:storage })

subcategoryRoutes.get('/parent-category',parentCategory) //


subcategoryRoutes.post('/insert',upload.single('subcategoryImage'),subcategoryInsert)


subcategoryRoutes.get('/view',subcategoryView)

// subcategoryRoutes.put('/change-status/:id',changeStatus)

// subcategoryRoutes.get('/edit-row-data/:id',editRowData)

// subcategoryRoutes.put('/update/:id',upload.single('categoryImage'),categoryUpdate)

module.exports={subcategoryRoutes}

// http://localhost:8120/admin/subcategory/parent-category