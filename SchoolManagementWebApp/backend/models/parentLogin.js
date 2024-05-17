const mongoose = require("../mongoose")

const parentLoginSchema = new mongoose.Schema({
    admissionNumber:String,
    password:String
});
let parentLoginModel = mongoose.model('parentLogin',parentLoginSchema);

module.exports = parentLoginModel;