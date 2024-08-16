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

module.exports = router;
