const mongoose = require("../mongoose")

const syllabusSchema = new mongoose.Schema({
    class:{type:Number},
    telugu: String,
    hindi:String,
    english:String,
    mathematics:String,
    science:String,
    social:String,
    });
let syllabusModel = mongoose.model('syllabus',syllabusSchema);

module.exports = syllabusModel;