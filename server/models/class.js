var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  students: [
    {
      sid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    },
  ],
  material: [
    {
      title: {
        type: String,
      },
    },
  ],
  quizzes: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
    },
  ],
  assignments: [
    {
      assignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
    },
  ],
  totalMarks: {
    type: Number,
  },
  marks: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      obtainMarks: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Class", classSchema);
