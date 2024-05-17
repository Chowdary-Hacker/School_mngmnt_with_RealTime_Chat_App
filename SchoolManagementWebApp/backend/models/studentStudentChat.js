const mongoose = require("../mongoose")

// studentStudentChat model
const studentStudentChatSchema = new mongoose.Schema({
    data:String,
    sender:String,
    reciever:String,
    senderStudentName:String,
    receiverStudentName:String, 
    receiverAdmissionNumber:String,
    date:String
});
let studentStudentChatModel = mongoose.model('studentStudentChat',studentStudentChatSchema);

module.exports = studentStudentChatModel;