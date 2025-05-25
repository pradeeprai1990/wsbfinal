const { materialModel } = require("../../models/materialModel")

let materialInsert=async (req,res)=>{
    let {materialName,materialOrder}=req.body
     let obj={
         materialName,
         materialStatus:true,
         materialOrder
     }
     let material= await materialModel(obj)
     let materialRes=await material.save() //Insert
     res.send({
         status:1,
         msg:"material Save",
         materialRes
     })
 }
 
 module.exports={materialInsert}