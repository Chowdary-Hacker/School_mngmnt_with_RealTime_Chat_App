const mongoose = require("../mongoose")

// batch model
const batchSchema = new mongoose.Schema({
    batch:String
});
let batchModel = mongoose.model('batch',batchSchema);

module.exports = batchModel;