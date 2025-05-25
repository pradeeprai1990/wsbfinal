const { categoryModel } = require("../../models/categoryModels")
const { subcategoryModel } = require("../../models/subCategoryModels")


let parentCategory=async (req,res)=>{
    let categoryList=await categoryModel.find({categoryStatus:true}).select('categoryName')
    let obj={
        status:1,
        categoryList
    }
    res.send(obj)
}


let subcategoryInsert=async (req,res)=>{
    let {parentCategory,subCategoryName,subCategoryOrder}=req.body
    console.log(req.file)
    let obj={
        subcategoryName:subCategoryName,
        parentCategory,
        subcategoryStatus:true,
        subcategoryOrder:subCategoryOrder
    }

    if(req.file){
        if(req.file.filename!=undefined && req.file.filename!='' && req.file.filename!=null){
            obj['subcategoryImage']=req.file.filename

        }
    }

    try{
        let category=await subcategoryModel(obj)
        let catRes=await category.save()
        res.send({
            status:1,
            msg:"sub Category Save",
            catRes
        })
    }
    catch(error){
        res.send({
            status:0,
            msg:"sub Category Name Allready exits...",
            error
        })
    }

}

let subcategoryView=async (req,res)=>{
    let subcategory=await subcategoryModel.find().populate('parentCategory','categoryName')

    let staticPath=process.env.STATICPATH+"/uploads/subcategory/"
    res.send({
        status:1,
        staticPath,
        msg:"CategoryData Data",
        subcategory,
        
    })
 }


 
module.exports={parentCategory,subcategoryInsert,subcategoryView}