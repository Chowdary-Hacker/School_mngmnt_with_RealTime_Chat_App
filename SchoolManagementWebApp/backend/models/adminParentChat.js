const mongoose = require("../mongoose")

// adminParentChat model
const adminParentChatSchema = new mongoose.Schema({
    data:String,
    sender:String,
    reciever:String,
    parentName:String,
    childAdmissionNumber:String,
    date:String
});
let adminParentChatModel = mongoose.model('adminParentChat',adminParentChatSchema);

module.exports = adminParentChatModel;