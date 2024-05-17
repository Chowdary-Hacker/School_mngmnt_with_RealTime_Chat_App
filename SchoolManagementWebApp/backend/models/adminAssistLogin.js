const mongoose = require("../mongoose")

// model adminAssistLogin
const adminAssistLoginSchema = new mongoose.Schema({
    userName:String,
    password:String
});
let adminAssistLoginModel = mongoose.model('adminAssistLogin',adminAssistLoginSchema);

module.exports = adminAssistLoginModel;