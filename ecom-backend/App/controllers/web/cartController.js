const { cartlModel } = require("../../models/cartModels")

let addtoCart=async (req,res)=>{
    console.log(req.body)
    let {color,product,id}=req.body
    let obj={
        productColor:color,
        userId:id,
        qty:1,
        product
    }
    let cartRes=await cartlModel.insertOne(obj)
    let resobj={
        status:1,
        msg:"Data Added in Cart",
        cartRes
    }
    res.send(resobj)
}


let showCart=async (req,res)=>{
    let {id}=req.body
    let data=await cartlModel.find({userId:id})
    let staticPath=process.env.STATICPATH+"/uploads/product/"
    let resobj={
        status:1,
        msg:"Data ",
        staticPath,
        data
    }
    res.send(resobj)
}
module.exports={addtoCart,showCart}