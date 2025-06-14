const { colorModel } = require("../../models/colorModels")

let colorView=async (req,res)=>{

    let searchData={}
  
 
    let {title,currentPage}=req.query
 
    if(title){
        searchData={
            $or:[{colorName:new RegExp(title,"i")},{colorCode:new RegExp(title,"i")}]
        }
    }
    let limit=3

    let skip=(currentPage-1)*limit;  //3-1 = 2*3  = 6
   

    let colorData=await colorModel.find(searchData).skip(skip).limit(limit) 

    let totRec=await colorModel.find(searchData)

    res.send({
        status:1,
        msg:"Color Data",
        pages:Math.ceil(totRec.length/limit),
        colorData
    })
}

let colorInsert=async (req,res)=>{
   let {colorName,colorCode,colorOrder}=req.body
    let obj={
        colorName,
        colorCode,
        colorStatus:true,
        colorOrder
    }
    let color= await colorModel(obj)
    let colorRes=await color.save() //Insert
    res.send({
        status:1,
        msg:"Color Save",
        colorRes
    })
}

let colorDelete=async (req,res)=>{
    
    //Array

  let ids=req.body.ids;
  
//    let delRes= await colorModel.deleteOne({_id:"6810b707fb327aad798bae2a"})

//Method 1

let delRes= await colorModel.deleteMany({_id:{$in:ids}})
//Method 2
// for(let v of ids){
//     await colorModel.deleteOne({_id:v})
// }

   res.send({
    status:1,
    msg:"Color Delete",
  
})

}




module.exports={colorView,colorInsert,colorDelete}