const mongoose = require('mongoose');

let subSubcategorySchema = mongoose.Schema(
    {
    subSubcategoryName: {  //T-Shirts
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 20,
        required: true,
       
    },
    parentCategory:{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }, //Men
    subparentCategory:{ type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' }, //Topwear
    subSubcategoryImage:String, //1.jpg
    subSubcategoryStatus: Boolean,  //true
    subSubcategoryOrder: Number  //1
},{
    timestamps: true
}


);

let subSubcategoryModel = mongoose.model("subSubcategory", subSubcategorySchema);
module.exports = { subSubcategoryModel };


