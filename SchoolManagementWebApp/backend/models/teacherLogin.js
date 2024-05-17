const mongoose = require("../mongoose")

// model teacherLogin
const teacherLoginSchema = new mongoose.Schema({
    userName:String,
    password:String
});
let teacherLoginModel = mongoose.model('teacherLogin',teacherLoginSchema);

module.exports = teacherLoginModel;