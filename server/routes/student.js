var express = require("express");
var router = express.Router();
var Class = require("../models/class");
const Quiz = require("../models/quiz");
const Student = require("../models/student");

router.get("/", function (req, res, next) {
  res.render("stdDashboard", {
    title: "Student Dashboard",
  });
});

router.get("/subjects/:stdId", function (req, res, next) {
  Student.findById(req.params.stdId)
    .populate("subjects")
    .then((result) => {
      res.send(result.subjects);
    });
});

router.get("/viewquiz/class/:classId", function (req, res, next) {
  Class.findOne({ _id: req.params.classId })
    .populate("quizzes.quizId")
    .select("quizzes")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// Attempt Quiz
router.put(
  "/attemptquiz/student/:stdId/quiz/:quizId",
  function (req, res, next) {
    Quiz.findOneAndUpdate(
      { _id: req.params.quizId },
      {
        $push: {
          attemptedBy: {
            stdId: req.params.stdId,
            answer: req.body.answer,
          },
        },
      },
      { new: true, upsert: false }
    )
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  }
);

router.get("/viewassignment/class/:classId", function (req, res, next) {
  Class.findOne({ _id: req.params.classId })
    .populate("assignments.assignId")
    .select("assignments")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.post("/submitassignment", function (req, res, next) {
  res.send("Assignmet Submitted");
});

router.get("/viewmaterial/class/:classId", function (req, res, next) {
  Class.findOne({ _id: req.params.classId })
    .select("material")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get("/downloadmaterial", function (req, res, next) {
  res.send("Material Downloaded");
});

router.get("/result/:classId/student/:stdId", function (req, res, next) {
  Class.findOne({ _id: req.params.classId })
    .then((result) => {
      const student = result.marks.filter((std) => {
        return std.studentId == req.params.stdId;
      });
      res.status(200).send(student);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get("/result/:stdId", function (req, res, next) {
  Student.findById(req.params.stdId)
    .populate("subjects")
    .then((result) => {
      var classes = result.subjects;
      var totalMarks = 0;
      classes.forEach((classFound) => {
        totalMarks = totalMarks + classFound.totalMarks;
      });
      var obtained = 0;
      classes.forEach((classFound) => {
        classFound.marks.forEach((std) => {
          if (std.studentId == req.params.stdId) {
            obtained = obtained + std.obtainMarks;
          }
        });
      });
      res.send(obtained + " / " + totalMarks);
    })
    .catch((e) => {
      res.send(e);
    });
});

module.exports = router;
