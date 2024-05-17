const mongoose = require("../mongoose")

const timeTableSchema = new mongoose.Schema({
    class:{type:Number},
    monday:[{type:String}],
    tuesday:[{type:String}],
    wednesday:[{type:String}],
    thursday:[{type:String}],
    friday:[{type:String}],
    saturday:[{type:String}],    
});
let timeTableModel = mongoose.model('timeTable',timeTableSchema);

module.exports = timeTableModel;