let express=require("express")
const multer = require('multer');
const { parentCategory } = require("../../controllers/admin/subCategoryController");
const { subparentCategory, subSubcategoryInsert } = require("../../controllers/admin/subSubCategoryController");
let subSubcategoryRoutes=express.Router()
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/subsubcategory")
    }, //Upload
    filename: function (req, file, cb) { //return d 
      cb(null, Date.now()+file.originalname);
    }
  });
  
  
  const upload = multer({ storage:storage })
subSubcategoryRoutes.get('/parent-category',parentCategory)
subSubcategoryRoutes.get('/sub-parent-category/:pid',subparentCategory)
subSubcategoryRoutes.post('/insert',upload.single('categoryImage'),subSubcategoryInsert)



module.exports={subSubcategoryRoutes}






