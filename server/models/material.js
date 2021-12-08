const mongoose = require("mongoose");

var materialSchema = new mongoose.Schema({});

var Material = mongoose.model("Material", materialSchema);
module.exports = Material;
