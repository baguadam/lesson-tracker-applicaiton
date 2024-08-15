const express = require("express");
const router = express.Router();
const { Students, Teachers } = require("../models");
const { jwtAuth, handleAuthError } = require("../middlewares/authentication");

router.get("/", jwtAuth, handleAuthError, async (req, res, next) => {
  try {
    const { id } = req.auth;
    const relatedStudents = await Students.findAll({
      where: {
        TeacherId: id,
      },
    });

    res.json(relatedStudents);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", jwtAuth, handleAuthError, async (req, res, next) => {
  try {
    const { id: studentId } = req.params;
    const { id: teacherId } = req.auth;

    const searchedStudent = await Students.findOne({
      where: {
        id: studentId,
        TeacherId: teacherId,
      },
    });

    if (!searchedStudent) {
      return res.status(404).json({
        message: "Couldn't find related student with the provided ID!",
      });
    }

    return res.json(searchedStudent);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
