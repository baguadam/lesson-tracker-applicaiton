const express = require("express");
const router = express.Router();
const { Students } = require("../models");

router.get("/", async (req, res) => {
  res.json(await Students.findAll());
});

module.exports = router;
