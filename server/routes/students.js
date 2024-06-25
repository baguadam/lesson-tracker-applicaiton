const express = require("express");
const router = express.Router();
const { Students } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    res.json(await Students.findAll());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
