const mongoose = require("../mongoose")

// fee model
const feeSchema = new mongoose.Schema({
    admissionNumber:String,
    parentName:String,
    studentName:String,
    studentClass:{type:Number},
    paidAmount:{type:Number},
    totalAmount:{type:Number},
    paymentDetails:[{paidAmount:{type:Number}, date:String},],
    fromDate:String
});
let feeModel = mongoose.model('fee',feeSchema);

module.exports = feeModel;