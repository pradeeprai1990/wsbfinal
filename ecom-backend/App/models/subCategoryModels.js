const mongoose = require('mongoose');

let subcategorySchema = mongoose.Schema(
    {
    subcategoryName: {  //Topwear
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 20,
        required: true,
       
    },
    parentCategory:{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }, //681b4c2ab467c04d8d2c57e7
    subcategoryImage:String, //1.jpg
    subcategoryStatus: Boolean,  //true
    subcategoryOrder: Number  //1
},{
    timestamps: true
}


);

let subcategoryModel = mongoose.model("subcategory", subcategorySchema);
module.exports = { subcategoryModel };