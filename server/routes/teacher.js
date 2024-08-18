const express = require("express");
const router = express.Router();
const { Teachers, Students } = require("../models");
const {
  handleAuthError,
  jwtAuth,
  handleNotMatchingTeacher,
} = require("../middlewares/authentication");
const {
  validateAllowedUpdates,
  validateId,
} = require("../middlewares/validation");

router.put(
  "/:id",
  jwtAuth,
  handleAuthError,
  validateId,
  handleNotMatchingTeacher,
  validateAllowedUpdates(["name", "email", "subjects"]),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const currentUser = await Teachers.findByPk(id);
      if (!currentUser) {
        return res.status(404).json({ message: "Teacher could not be found!" });
      }

      await currentUser.update(req.body, {
        fields: allowedUpdates,
      });

      return res.json({
        message: "Teacher updated successfully",
        teacher: currentUser,
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
  handleNotMatchingTeacher,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const teacher = await Teachers.findByPk(id);
      if (!teacher) {
        return res.status(404).json({ message: "Teacher could not be found!" });
      }

      await teacher.destroy();

      res.json({ message: "Teacher deleted successfully!" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
