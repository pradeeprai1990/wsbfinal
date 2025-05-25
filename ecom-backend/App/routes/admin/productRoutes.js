let express = require("express")
let path = require("path")
const multer = require('multer');
const { productInsert, parentCategory, subparentCategory, subSubparentCategory, getColor, getMeterial, productView } = require("../../controllers/admin/productController");
let productRoutes = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/product")
  }, //Upload
  filename: function (req, file, cb) { //return d 
    cb(null, Date.now() + file.originalname);
  }
});


const upload = multer({ storage: storage })

const cpUpload = upload.fields(

  [
    { name: 'productImage', maxCount: 1 },
    { name: 'productBackImage', maxCount: 1 },
    { name: 'productGallery', maxCount: 10 }

  ]


)

productRoutes.get('/parent-category', parentCategory)

productRoutes.get('/sub-parent-category/:pid', subparentCategory)


productRoutes.get('/sub-sub-parent-category/:pid', subSubparentCategory)



productRoutes.get('/color', getColor)
productRoutes.get('/meterial', getMeterial)





productRoutes.post('/insert', cpUpload, productInsert)
productRoutes.get('/view',  productView)




module.exports = { productRoutes }
