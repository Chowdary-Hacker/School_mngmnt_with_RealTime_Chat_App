const mongoose = require("../mongoose")

// model teacherInfo
const teacherInfoSchema = new mongoose.Schema({
    email:{type:String},
    name:String,
    class:[{class:String,subject:[{type:String}]}],
    salary:{type:Number}
});
let teacherInfoModel = mongoose.model('teacherInfo',teacherInfoSchema);

module.exports = teacherInfoModel;