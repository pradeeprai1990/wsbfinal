const mongoose = require('mongoose');

let materialSchema = mongoose.Schema({
   materialName: {
        type: String,
        minlength: 3,
        unique: true,
        maxlength: 20,
        required: true
    },
   materialStatus: Boolean,
   materialOrder: Number
});

let materialModel = mongoose.model("material",materialSchema);
module.exports = {materialModel };