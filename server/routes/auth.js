const express = require("express");
const router = express.Router();
const { Teachers } = require("../models");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Missing email or error!" });

    const teacher = await Teachers.findOne({ where: { email } });
    if (!teacher)
      return res.status(400).json({ message: "User cannot be found!" });

    if (teacher.comparePassword(password)) {
      const token = jwt.sign(teacher.toJSON(), "secret-key", {
        algorithm: "HS256",
        expiresIn: "1h",
      });

      res.json({ token });
    } else {
      res.status(400).json({ message: "Login failed!" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get(
  "/me",
  expressjwt({ secret: "secret-key", algorithms: ["HS256"] }),
  async (req, res) => {
    res.json(req.auth);
  }
);

module.exports = router;
