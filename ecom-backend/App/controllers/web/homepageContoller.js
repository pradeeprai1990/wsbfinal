const { productModel } = require("../../models/productModel")


let bestsellingProducts=async (req,res)=>{
    let productList=await productModel.find({prodcutSelling:true}).populate('productColor','colorName').populate('subSubCategory','subSubcategoryName').select(['productName','prodcutactualPrice','prodcutsalePrice','productImage'])
     let staticPath=process.env.STATICPATH+"/uploads/product/"
    let obj={
        status:1,
        staticPath,
        productList,
        
    }
    res.send(obj)
}

module.exports={bestsellingProducts}