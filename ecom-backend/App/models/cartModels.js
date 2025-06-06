const mongoose = require('mongoose');

let cartlSchema = mongoose.Schema({
    productColor:{type: mongoose.Schema.Types.ObjectId, ref: 'color'},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    qty:Number,
    product:Object,
   
});

let cartlModel = mongoose.model("cart",cartlSchema);
module.exports = {cartlModel };