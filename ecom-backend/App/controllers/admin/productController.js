const { categoryModel } = require("../../models/categoryModels")
const { colorModel } = require("../../models/colorModels")
const { materialModel } = require("../../models/materialModel")
const { productModel } = require("../../models/productModel")
const { subcategoryModel } = require("../../models/subCategoryModels")
const { subSubcategoryModel } = require("../../models/subSubCategoryModels")

let productInsert=async (req,res)=>{
    let allData={...req.body};
   
    if(req.files){
        if(req.files.productImage){
            allData['productImage']=req.files.productImage[0].filename
        }  
        
        if(req.files.productBackImage){
            allData['productBackImage']=req.files.productBackImage[0].filename
        } 
        
        if(req.files.productGallery){
            allData['productGallery']  =req.files.productGallery.map((items)=>items.filename)
        }
        
    }

    let product=await productModel.insertOne(allData)
    let resObj={
        status:1,
        msg:"Product Save",
        product
    }
    res.send(resObj)
   
}

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

let subSubparentCategory=async (req,res)=>{
    let {pid}=req.params;
    let subSubcategoryList=await subSubcategoryModel.find({subSubcategoryStatus:true,subparentCategory:pid}).select('subSubcategoryName')
    let obj={
        status:1,
        subSubcategoryList
    }
    res.send(obj)
}

let getColor=async (req,res)=>{
    let colorList=await colorModel.find({colorStatus:true}).select('colorName')
    let obj={
        status:1,
        colorList
    }
    res.send(obj)
}

let getMeterial=async (req,res)=>{
    let meterialList=await materialModel.find({materialStatus:true}).select('materialName')
    let obj={
        status:1,
        meterialList
    }
    res.send(obj)
}

let productView=async (req,res)=>{
    let productList=await productModel.find().populate('parentCategory','categoryName').populate('subCategory','subcategoryName').populate('subSubCategory','subSubcategoryName').populate('productColor','colorName').populate('productMeterial','materialName')

    let obj={
        status:1,
        productList
    }
    res.send(obj)
   
}

module.exports={productInsert,parentCategory,subparentCategory,subSubparentCategory,getColor,getMeterial,productView}