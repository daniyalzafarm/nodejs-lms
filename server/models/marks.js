const mongoose = require("mongoose");

var marksSchema = new mongoose.Schema({
  subjects: [
    {
      name: {
        type: String,
      },
      grade: {
        type: String,
      },
    },
  ],
  marks: {
    type: Number,
  },
});

var Marks = mongoose.model("Marks", marksSchema);
module.exports = Marks;
