const mongoose = require("mongoose");

var quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: {
    // question: {
    type: String,
    required: true,
    // },
    // answers: [
    //   {
    //     stdId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Student",
    //     },
    //     answer: {
    //       type: String,
    //     },
    //   },
    // ],
  },
  attemptedBy: [
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
});

var Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
