const {mongo_url} = require("./configuration/config")
const mongoose = require("mongoose")

mongoose.connect(mongo_url)
.then(()=>console.log("mongodb connection established "))
.catch((err)=>console.log(err));

module.exports = mongoose ;