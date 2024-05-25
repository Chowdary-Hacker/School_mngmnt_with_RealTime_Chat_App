const mongoose = require("../mongoose")

const marksSchema = new mongoose.Schema({
    class:{type:Number}, batch:String,
    fa1:{telugu:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], hindi:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], english:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], mathematics:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], science:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], social:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},]}, 
    fa2:{telugu:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], hindi:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], english:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], mathematics:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], science:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], social:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},]}, 
    fa3:{telugu:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], hindi:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], english:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], mathematics:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], science:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], social:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},]}, 
    fa4:{telugu:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], hindi:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], english:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], mathematics:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], science:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},], social:[{admissionNumber:String, studentName:String, MaximumMark:String, marks:String},]}, 
});
let marksModel = mongoose.model('marks',marksSchema);

module.exports = marksModel;