const mongoose = require("../mongoose")

// adminParentChat model
const adminTeacherChatSchema = new mongoose.Schema({
    data:String,
    sender:String,
    reciever:String,
    teacherName:String,
    teacherMail:String,
    date:String
});
let adminTeacherChatModel = mongoose.model('adminTeacherChat',adminTeacherChatSchema);

module.exports = adminTeacherChatModel;