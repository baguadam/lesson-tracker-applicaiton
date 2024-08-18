const express = require("express");
const router = express.Router();
const { Teachers, Students } = require("../models");
const {
  handleAuthError,
  jwtAuth,
  handleNotMatchingTeacher,
} = require("../middlewares/authentication");

router.put(
  "/:id",
  jwtAuth,
  handleAuthError,
  handleNotMatchingTeacher,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { id: currentUserId } = req.auth;

      const currentUser = await Teachers.findOne({
        where: {
          id,
        },
      });
      if (!currentUser) {
        return res.status(404).json({ message: "Teacher could not be found!" });
      }

      const allowedUpdates = ["name", "email", "subjects"];
      const updates = Object.keys(req.body);
      const isValidOperation = updates.every((u) => allowedUpdates.includes(u));
      if (!isValidOperation) {
        return res.status(400).json({ message: "Invalid updates!" });
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
  handleNotMatchingTeacher,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { currentUserId } = req.auth;

      res.send("WORKING SO FAR");
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
