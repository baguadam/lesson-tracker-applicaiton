const { expressjwt: doAuth } = require("express-jwt");

// Middleware for JWT authentication
const jwtAuth = doAuth({ secret: "secret-key", algorithms: ["HS256"] });

// Middleware to handle missing parameters
const handleMissingParamError = (requiredParams) => (req, res, next) => {
  const missingParams = requiredParams.filter((param) => !(param in req.body));
  if (missingParams.length > 0) {
    res.status(400).json({
      error: `Missing required parameters: ${missingParams.join(", ")}`,
    });
  } else {
    next();
  }
};

// Middleware to handle authentication errors
const handleAuthError = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Not authorized" });
  } else {
    next(err);
  }
};

module.exports = {
  jwtAuth,
  handleMissingParamError,
  handleAuthError,
};
