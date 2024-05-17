const mongoose = require("../mongoose")

// adminAdminChat model
const adminAdminChatSchema = new mongoose.Schema({
    data:String,
    sender:String,
    reciever:String,
    adminAssistName:String,
    date:String
});
let adminAdminChatModel = mongoose.model('adminAdminChat',adminAdminChatSchema);

module.exports = adminAdminChatModel;