const mongoose = require('mongoose');

let colorSchema = mongoose.Schema({
    colorName: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    colorCode: String,
    colorStatus: Boolean,
    colorOrder: Number
});

let colorModel = mongoose.model("color", colorSchema);
module.exports = { colorModel };