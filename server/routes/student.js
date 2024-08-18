const express = require("express");
const router = express.Router();
const { Students, Teachers } = require("../models");
const {
  jwtAuth,
  handleAuthError,
  handleMissingParamError,
} = require("../middlewares/authentication");
const {
  validateAllowedUpdates,
  validateId,
} = require("../middlewares/validation");
const {
  getStudentAndAuthorize,
  validateStudentData,
} = require("../middlewares/studentMiddleware");

router.get(
  "/:id",
  jwtAuth,
  handleAuthError,
  validateId,
  async (req, res, next) => {
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
  }
);

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

router.put(
  "/:id",
  jwtAuth,
  handleAuthError,
  validateId,
  validateAllowedUpdates(["name", "price", "subject", "lessonDates"]),
  validateStudentData,
  getStudentAndAuthorize,
  async (req, res, next) => {
    try {
      const { student } = req;

      await student.update(req.body, {
        fields: ["name", "price", "subject", "lessonDates"],
      });

      res.json({
        message: "Student updated successfully",
        student,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.delete(
  "/:id",
  jwtAuth,
  handleAuthError,
  validateId,
  getStudentAndAuthorize,
  async (req, res, next) => {
    try {
      const { student } = req;

      await student.destroy();

      res.json({ message: "Student deleted successfully!" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
