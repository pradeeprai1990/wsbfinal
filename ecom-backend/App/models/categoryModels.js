const mongoose = require('mongoose');

let categorySchema = mongoose.Schema(
    {
    categoryName: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 20,
        required: true,
       
    },
    categoryImage:String,
    categoryStatus: Boolean,
    categoryOrder: Number
},{
    timestamps: true
}


);

let categoryModel = mongoose.model("category", categorySchema);
module.exports = { categoryModel };