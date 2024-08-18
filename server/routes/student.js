const express = require("express");
const router = express.Router();
const { Students, Teachers } = require("../models");
const {
  jwtAuth,
  handleAuthError,
  handleMissingParamError,
} = require("../middlewares/authentication");
const { validateStudentData } = require("../middlewares/validation");

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
        message: "Student not found!",
      });
    }

    return res.json(searchedStudent);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  jwtAuth,
  handleAuthError,
  handleMissingParamError(["name", "price", "subject", "lessonDates"]),
  validateStudentData,
  async (req, res, next) => {
    try {
      const { id: teacherId } = req.auth;
      const { name, price, subject, lessonDates } = req.body;

      const teacher = await Teachers.findByPk(teacherId);
      if (!teacher.subjects.includes(subject)) {
        return res.status(400).json({ message: "Wrong subject" });
      }

      const student = await Students.create({
        name,
        price,
        subject,
        lessonDates,
        TeacherId: teacherId,
      });

      res.json({ message: "Student created successfully", student });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
