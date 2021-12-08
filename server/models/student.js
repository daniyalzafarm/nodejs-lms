var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  },
});

studentSchema.virtual("subjects", {
  ref: "Class",
  localField: "_id",
  foreignField: "students.sid",
});

module.exports = mongoose.model("Student", studentSchema);
