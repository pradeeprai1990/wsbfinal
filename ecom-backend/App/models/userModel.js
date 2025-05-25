const mongoose = require('mongoose');

let userSchema = mongoose.Schema(
    {
    userEmail: {
        type: String,
        unique: true,
        minlength: 3,
        required: true,
       
    },
    userPhone:String,
    userPassword: String,
    userAddress: String,
    userPhoto:String,
    verifyStatus:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true
}


);

let userModel = mongoose.model("user", userSchema);
module.exports = { userModel };