const { cartlModel } = require("../../models/cartModels")
const orderModel = require("../../models/OrderModel")
var crypto = require('crypto');
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
    key_id: 'rzp_test_WAft3lA6ly3OBc',
    key_secret: '68E17CNWY8SemCvZ6ylOkuOY',
});

  
let orderSave=async (req,res)=>{
    let {shippingAddess,orderItems,paymentMethod,total,shipping,orderQty,id}=req.body
       
    let obj={
        shippingAddess,
        orderItems,
        paymentMethod,
        orderAmount:total,
        orderQty,
        shippingCharges:shipping,
        orderUser:id,
    }
    let order
    if(req.body.paymentMethod==1){

       
        obj['orderStatus']="process"
        order=await orderModel.insertOne(obj)
        await cartlModel.deleteMany({userId:id})

        //COD
    }
    else{
         //Online Payment
         //Db Order Create
         obj['orderStatus']="process"
          obj['paymentStatus']="1" //process
         order=await orderModel.insertOne(obj) //DB 
        
        
         const razorpayOrder = await razorpay.orders.create({
            amount: total * 100, // amount in the smallest currency unit
            currency:"INR",
            receipt:order._id,
            
          });
          

          await orderModel.updateOne({_id:order._id},{ $set:{
            razorpayOrderId:razorpayOrder.id
          } })
          //id=  razorpayOrder.id 


          ///
    //    console.log(razorpayOrder)
         
         // 
        // await cartlModel.deleteMany({userId:id})
         return res.send(razorpayOrder)

    }
    let resobj={
        status:1,
        msg:"Order Save",
        order
        
    }
    res.send(resobj)
}

let verifyOrder=async (req,res)=>{
  
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,id } = req.body;

    const key_secret = '68E17CNWY8SemCvZ6ylOkuOY';


    const hmac = crypto.createHmac('sha256', key_secret); //
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    console.log(generated_signature)
    console.log(razorpay_signature)
    console.log(req.body)
  



    if(generated_signature==razorpay_signature){
        await cartlModel.deleteMany({userId:id})


        let updateOrder=await orderModel.updateOne(
            {razorpayOrderId:razorpay_order_id},
            {
                razorpayPayment:razorpay_payment_id,
                paymentStatus:2,
                orderStatus:"process"
            })
       
            res.status(200).json({status:1,message:"Payment Success"})
    }
    else{
        res.status(400).json({status:0,message:"Invalid Signature"})
    }

   // razorpay_order_id="order_Q2N7V3eV1RLWrU"
//razorpay_payment_id="pay_Q2N8AZm2we0HA0"
//razorpay_signature="651a951918d3951678ab2e0757d5167b6c4f50e4f5d359feacf52c6e04766499"
//  razorpay_order_id + razorpay_payment_id

//razorpay_signature="651a951918d3951678ab2e0757d5167b6c4f50e4f5d359feacf52c6e04766499"

}

let showOrder=async (req,res)=>{
    let userId= req.id
    let myOrder=await orderModel.find({orderUser:userId})
    res.send({status:1,data:myOrder})
}

let showsingleOrder=async (req,res)=>{
    let {id}= req.params
    let myOrder=await orderModel.findOne({_id:id})
    res.send(
        {
            status:1,
            data:myOrder, 
            staticPath:"uploads/product/"
    })
}


module.exports={orderSave,verifyOrder}