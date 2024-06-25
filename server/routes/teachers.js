const express = require("express");
const router = express.Router();
const { Teachers } = require("../models");

router.get("/", async (req, res) => {
  res.json(await Teachers.findAll());
});

module.exports = router;
