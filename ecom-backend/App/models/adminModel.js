const mongoose = require('mongoose');

let adminSchema = mongoose.Schema({
    admin_username: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    admin_password: String,
    
});

let adminModel = mongoose.model("admin", adminSchema);
module.exports = { adminModel };