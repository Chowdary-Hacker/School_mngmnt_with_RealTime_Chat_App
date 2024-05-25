const mongoose = require("../mongoose")

const studentInfoSchema = new mongoose.Schema({
    admissionNumber:String,
    class:{type:Number},
    parentEmail:{type:String},
    studentEmail:{type:String},
    marks:{telugu:{assesment1:{type:Number}, assesment2:{type:Number}, assesment3:{type:Number}, finalExam:{type:Number}},
           hindi:{assesment1:{type:Number}, assesment2:{type:Number}, assesment3:{type:Number}, finalExam:{type:Number}},
           english:{assesment1:{type:Number}, assesment2:{type:Number}, assesment3:{type:Number}, finalExam:{type:Number}},
           maths:{assesment1:{type:Number}, assesment2:{type:Number}, assesment3:{type:Number}, finalExam:{type:Number}},
           science:{assesment1:{type:Number}, assesment2:{type:Number}, assesment3:{type:Number}, finalExam:{type:Number}},
           social:{assesment1:{type:Number}, assesment2:{type:Number}, assesment3:{type:Number}, finalExam:{type:Number}}
           },
    name:String    
});
let studentInfoModel = mongoose.model('studentInfo',studentInfoSchema);

module.exports = studentInfoModel;