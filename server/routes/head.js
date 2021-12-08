var express = require("express");
var router = express.Router();
var Class = require("../models/class");
var Student = require("../models/student");

router.get("/", function (req, res, next) {
  res.render("headDashboard", {
    title: "Head Dashboard",
  });
});

router.get("/classes", function (req, res, next) {
  Class.find({})
    .populate("teacher")
    .populate("students.sid")
    .populate("quizzes.quizId")
    .populate("assignments.assignId")
    .populate("marks.studentId")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    });
});

router.get("/students", function (req, res, next) {
  res.render("headStudents", {
    title: "Students",
  });
});

router.get("/result/class/:classId", function (req, res, next) {
  Class.findOne({ _id: req.params.classId })
    .populate("marks.studentId")
    .select("marks")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get("/result/student/:stdId", function (req, res, next) {
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

module.exports = router;
