const mongoose = require("mongoose");

var assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  work: {
    question: {
      type: String,
      required: true,
    },
    answers: [
      {
        stdId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        answer: {
          type: String,
        },
      },
    ],
  },
  attemptedBy: [
    {
      stdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    },
  ],
});

var Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
