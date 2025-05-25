const mongoose = require('mongoose');
let productSchema = mongoose.Schema({
    productName:{  //RARE RABBIT
        unique:true,
        type:String
    },
    parentCategory:{type: mongoose.Schema.Types.ObjectId, ref: 'category'}, //men
    subCategory:{type: mongoose.Schema.Types.ObjectId, ref: 'subcategory'}, //Topwear
    subSubCategory:{type: mongoose.Schema.Types.ObjectId, ref: 'subSubcategory'},//T-Shirts
    productMeterial:[{type: mongoose.Schema.Types.ObjectId, ref: 'material'}],
    productColor:[ {type: mongoose.Schema.Types.ObjectId, ref: 'color'} ],
    prodcutType:{
        type:Number,
        enum: [1, 2, 3],
    },  // 1 Featured 2 New Arrivals 3 Onsale
    prodcutSelling:Boolean,
    prodcuttopRated:Boolean,
    prodcutUpsell:Boolean,
    prodcutactualPrice:Number, //500
    prodcutsalePrice:Number,  //400
    productStocks:Number,
    productOrder:Number,
    productDesciption:String,
    productImage:String,
    productBackImage:String,
    productGallery:Object,
    productStatus:Boolean,
    
})

let productModel = mongoose.model("product", productSchema);
module.exports = { productModel };
