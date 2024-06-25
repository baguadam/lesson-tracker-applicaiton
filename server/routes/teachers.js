const express = require("express");
const router = express.Router();
const { Teachers } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    res.json(await Teachers.findAll());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
