var express = require("express");
var router = express.Router();
var Quiz = require("../models/quiz");
var Assignment = require("../models/assignment");
var Class = require("../models/class");

router.get("/", function (req, res, next) {
  res.render("teachDashboard", {
    title: "Teacher Dashboard",
  });
});

// View All Quizzes for Specific Class
router.get("/viewallquiz/class/:classId", function (req, res, next) {
  Class.find({ _id: req.params.classId })
    .select("quizzes")
    .populate("quizzes.quizId")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      res.send(results);
    });
});

// Add Quiz for Specific Class
router.post("/addquiz/class/:classId", function (req, res, next) {
  Quiz.create(req.body)
    .then(
      (quiz) => {
        return Class.findOneAndUpdate(
          { _id: req.params.classId },
          {
            $push: {
              quizzes: { quizId: quiz._id },
            },
          },
          { new: true, upsert: false }
        );
      },
      (err) => next(err)
    )
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => next(err));
});

router.get("/downloadquiz", function (req, res, next) {
  res.send("Attempted Quiz Downloaded");
});

// Delete Quiz of Specific Class
router.put("/class/:classId/quiz/:quizId", function (req, res, next) {
  Class.findOneAndUpdate(
    { _id: req.params.classId },
    {
      $pull: {
        quizzes: {
          quizId: req.params.quizId,
        },
      },
    },
    { new: true, upsert: false }
  )
    .then(() => {
      return Quiz.findOneAndDelete({ _id: req.params.quizId });
    })
    .then(() => {
      res.status(200).send("Quiz Deleted Successfully!");
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// View All Assignments for Specific Class
router.get("/viewallassign/class/:classId", function (req, res, next) {
  Class.find({ _id: req.params.classId })
    .select("assignments")
    .populate("assignments.assignId")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      res.send(results);
    });
});

// Add Assignment for Specific Class
router.post("/addassign/class/:classId", function (req, res, next) {
  Assignment.create(req.body)
    .then((assign) => {
      return Class.findOneAndUpdate(
        { _id: req.params.classId },
        {
          $push: {
            assignments: {
              assignId: assign._id,
            },
          },
        },
        { new: true, upsert: false }
      );
    })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => next(err));
});

router.get("/downloadassign", function (req, res, next) {
  res.send("Attempted Assignment Downloaded");
});

// Delete Assignment of Specific Class
router.put("/class/:classId/assignment/:assignId", function (req, res, next) {
  Class.findOneAndUpdate(
    { _id: req.params.classId },
    {
      $pull: {
        assignments: {
          assignId: req.params.assignId,
        },
      },
    },
    { new: true, upsert: false }
  )
    .then(() => {
      return Assignment.findOneAndDelete({ _id: req.params.assignId });
    })
    .then(() => {
      res.status(200).send("Assignment Deleted Successfully!");
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// Add material for specific Class
router.put("/addmaterial/class/:classId", function (req, res, next) {
  Class.findOneAndUpdate(
    { _id: req.params.classId },
    {
      $push: {
        material: {
          title: req.body.title,
        },
      },
    },
    { new: true, upsert: false },
    function (error, results) {
      if (error) {
        return next(error);
      }
      res.json(results);
    }
  );
});

// See all materials for specific class
router.get("/materials/:classId", function (req, res, next) {
  Class.findById(req.params.classId)
    .then((classFound) => {
      res.send(classFound.material);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// Delete Material for specific class
router.put("/class/:classId/material/:materialId", function (req, res, next) {
  Class.findOneAndUpdate(
    { _id: req.params.classId },
    {
      $pull: {
        material: {
          _id: req.params.materialId,
        },
      },
    },
    { new: true, upsert: false },
    function (error, results) {
      if (error) {
        return next(error);
      }
      res.json(results);
    }
  );
});

// Add marks of Student
router.put("/class/:classId/student/:stdId", function (req, res, next) {
  Class.findOneAndUpdate(
    { _id: req.params.classId },
    {
      $push: {
        marks: {
          studentId: req.params.stdId,
          obtainMarks: req.body.obtainMarks,
        },
      },
    },
    { new: true, upsert: false }
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});
// Update Marks of Student
router.put("/updatemarks/:classId/student/:stdId", function (req, res, next) {
  Class.findOneAndUpdate(
    { _id: req.params.classId, "marks.studentId": req.params.stdId },
    {
      $set: {
        "marks.$.obtainMarks": req.body.obtainMarks,
      },
    },
    { new: true, upsert: false }
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// Delete Marks of Student
router.put("/deletemarks/:classId/student/:stdId", function (req, res, next) {
  Class.findOneAndUpdate(
    { _id: req.params.classId },
    {
      $pull: {
        marks: {
          studentId: req.params.stdId,
        },
      },
    },
    { new: true, upsert: false },
    function (error, results) {
      if (error) {
        return next(error);
      }
      res.json(results);
    }
  );
});

module.exports = router;
