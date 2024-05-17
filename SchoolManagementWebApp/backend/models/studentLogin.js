const mongoose = require("../mongoose")

// model studentLogin
const studentLoginSchema = new mongoose.Schema({
    admissionNumber:String,
    password:String
});
let studentLoginModel = mongoose.model('studentLogin',studentLoginSchema);

module.exports = studentLoginModel;