const mongoose = require("../mongoose")

// adminStudentChat model
const adminStudentChatSchema = new mongoose.Schema({
    data:String,
    sender:String,
    reciever:String,
    admissionNumber:String,
    studentName:String,
    date:String
});
let adminStudentChatModel = mongoose.model('adminStudentChat',adminStudentChatSchema);

module.exports = adminStudentChatModel;