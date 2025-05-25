let express=require("express")
const mongoose = require('mongoose');
let cors=require("cors")
const { adminRoutes } = require("./App/routes/admin/adminRoutes");
const { adminModel } = require("./App/models/adminModel");
const { webRoutes } = require("./App/routes/web/webRoutes");
require("dotenv").config()
let app=express()

app.use(cors())
app.use(express.json())

app.use("/uploads/category",express.static("uploads/category")) //Allow Frontend Folder Access
app.use("/uploads/product",express.static("uploads/product")) //Allow Frontend Folder Access
app.use("/uploads/slider",express.static("uploads/slider")) //Allow Frontend Folder Access

app.use("/admin",adminRoutes)
app.use("/web",webRoutes)



mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
.then(()=>{
    app.listen(process.env.PORT,async ()=>{
        console.log(process.env.PORT)

       let checkAdminData=await adminModel.find() //[{}]
       if(checkAdminData.length==0){
            let obj={
                admin_username:"admin",
                admin_password:"admin123"
            }

            await adminModel.insertOne(obj)
       }
      



    })  //http://localhost:8120/admin/color/view
})


