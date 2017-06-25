var mongoose = require("mongoose");
var pdrSchema = mongoose.Schema({
    date: Object,
    fuel: String,
    location: String
});

module.exports = mongoose.model("pdr", pdrSchema);
