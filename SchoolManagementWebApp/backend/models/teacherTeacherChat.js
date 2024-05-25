const mongoose = require("../mongoose")

// teacherTeacherChat model
const teacherTeacherChatSchema = new mongoose.Schema({
    data:String,
    sender:String,
    reciever:String,
    senderTeacherName:String,
    receiverTeacherName:String, 
    receiverTeacherMail:String,
    date:String
});
let teacherTeacherChatModel = mongoose.model('teacherTeacherChat',teacherTeacherChatSchema);

module.exports = teacherTeacherChatModel;