const { Teachers, Students } = require("./models");
const express = require("express");
require("express-async-errors");
const app = express();

app.use(express.json());

// Routes
app.use("/students", require("./routes/students"));
app.use("/teachers", require("./routes/teachers"));
app.use("/auth", require("./routes/auth"));

// Vertical middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
});

// Listening on port 3000
app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  try {
    await require("./models").sequelize.authenticate();
    console.log("Database connected!");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
});
