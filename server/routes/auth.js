const express = require("express");
const router = express.Router();
const { Teachers } = require("../models");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const {
  handleMissingParamError,
  handleAuthError,
  jwtAuth,
} = require("../middlewares/authentication");

router.post(
  "/login",
  handleMissingParamError(["email", "password"]),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

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
  }
);

router.get("/me", jwtAuth, handleAuthError, async (req, res) => {
  res.json(req.auth);
});

module.exports = router;
