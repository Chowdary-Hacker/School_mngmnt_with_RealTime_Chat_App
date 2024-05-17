const mongoose = require("../mongoose")

// model adminLogin
const adminLoginSchema = new mongoose.Schema({
    mailId:String,
    userName:String,
    password:String
});
let adminLoginModel = mongoose.model('adminLogin',adminLoginSchema);

module.exports = adminLoginModel;