const express = require("express");
const router = express.Router();
const { Students } = require("../models");
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

module.exports = router;
