const express = require("express");
const router = express.Router();
const { Teachers, Students } = require("../models");
const { handleAuthError, jwtAuth } = require("../middlewares/authentication");

router.get("/students", jwtAuth, handleAuthError, async (req, res, next) => {
  try {
    const { id } = req.auth;

    const currentUserWithStudents = await Teachers.findOne({
      where: {
        id,
      },
      include: [{ model: Students, as: "students" }],
    });

    if (!currentUserWithStudents) {
      return res.status(404).json({ message: "Teacher could not be found!" });
    }

    res.json(currentUserWithStudents.students);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.put("/:id", jwtAuth, handleAuthError, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: currentUserId } = req.auth;

    if (!id) return res.status(400).json({ message: "Missing Teacher id!" });
    if (id !== currentUserId)
      return res
        .status(401)
        .json({ message: "Not authorized to modify the user!" });

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
});

module.exports = router;
