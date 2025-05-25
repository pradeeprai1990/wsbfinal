const { categoryModel } = require("../../models/categoryModels")

let categoryInsert=async (req,res)=>{

     let {categoryName,order}=req.body
    console.log(req.file)
    let obj={
        categoryName,
        categoryOrder:order,
        categoryStatus:true
    }

    if(req.file){
        if(req.file.filename!=undefined && req.file.filename!='' && req.file.filename!=null){
            obj['categoryImage']=req.file.filename

        }
    }

    try{
        let category=await categoryModel(obj)
        let catRes=await category.save()
        res.send({
            status:1,
            msg:"Category Save",
            catRes
        })
    }
    catch(error){
        res.send({
            status:0,
            msg:"Category Name Allready exits...",
            error
        })
    }

    
    
 }

 let categoryView=async (req,res)=>{
    let category=await categoryModel.find()

    let staticPath=process.env.STATICPATH+"/uploads/category/"
    res.send({
        status:1,
        staticPath,
        msg:"CategoryData Data",
        category,
        
    })
 }

 let changeStatus=async (req,res)=>{
    let {id}=req.params;
    let {status}=req.body
    let updateStatus=await categoryModel.updateOne({_id:id},{$set:{
        categoryStatus:status
    }})
    res.send({
        status:1,
        updateStatus,
        
    })
 }


 let editRowData=async (req,res)=>{
    let {id}=req.params;
    let category=await categoryModel.findOne({_id:id})
    let staticPath=process.env.STATICPATH+"/uploads/category/"
    res.send({
        status:1,
        staticPath,
        msg:"CategoryData Data",
        category,
        
    })
 }

 let categoryUpdate=async (req,res)=>{
    let {id}=req.params;
   
    let {categoryName,order}=req.body
  
   let obj={
       categoryName,
       categoryOrder:order,
      
   }

   if(req.file){
       if(req.file.filename!=undefined && req.file.filename!='' && req.file.filename!=null){
           obj['categoryImage']=req.file.filename

       }
   }

   try{
       let category=await categoryModel.updateOne({_id:id},{$set:obj})
      
       res.send({
           status:1,
           msg:"Category Save",
           category
       })
   }
   catch(error){
       res.send({
           status:0,
           msg:"Category Name Allready exits...",
           error
       })
   }

   
   
}

 module.exports={categoryInsert,categoryView,changeStatus,editRowData,categoryUpdate}