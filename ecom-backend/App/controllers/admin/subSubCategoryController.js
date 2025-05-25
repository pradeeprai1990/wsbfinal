const { categoryModel } = require("../../models/categoryModels")
const { subcategoryModel } = require("../../models/subCategoryModels")
const { subSubcategoryModel } = require("../../models/subSubCategoryModels")


let parentCategory=async (req,res)=>{
    let categoryList=await categoryModel.find({categoryStatus:true}).select('categoryName')
    let obj={
        status:1,
        categoryList
    }
    res.send(obj)
}

let subparentCategory=async (req,res)=>{
    let {pid}=req.params;
    let subcategoryList=await subcategoryModel.find({subcategoryStatus:true,parentCategory:pid}).select('subcategoryName')
    let obj={
        status:1,
        subcategoryList
    }
    res.send(obj)
}
let subSubcategoryInsert=async (req,res)=>{
    let {parentCategory,subSubcategoryName,subparentCategory,subSubcategoryOrder}=req.body
    console.log(req.file)
    let obj={
        subSubcategoryName,
        parentCategory,
        subparentCategory,
        subSubcategoryStatus:true,
        subSubcategoryOrder:subSubcategoryOrder
    }

    if(req.file){
        if(req.file.filename!=undefined && req.file.filename!='' && req.file.filename!=null){
            obj['subSubcategoryImage']=req.file.filename

        }
    }

    try{
        let category=await subSubcategoryModel(obj)
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


module.exports={parentCategory,subparentCategory,subSubcategoryInsert}