const validateStudentData = (req, res, next) => {
  const { price, lessonDates } = req.body;
  const acceptableDates = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  if (price && (!Number.isInteger(parseInt(price)) || parseInt(price) < 1)) {
    return res
      .status(400)
      .json({ message: "Price must be a positive integer" });
  }

  if (
    lessonDates &&
    (!Array.isArray(lessonDates) ||
      !lessonDates.every((lesson) => acceptableDates.includes(lesson)))
  ) {
    return res
      .status(400)
      .json({ message: "Lesson dates must be a valid array of weekdays!" });
  }

  next();
};

const validateAllowedUpdates = (allowedUpdates) => (req, res, next) => {
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((u) => allowedUpdates.includes(u));
  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid update!" });
  }

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing ID" });
  }

  const parsedId = parseInt(id, 10);
  if (!Number.isInteger(parsedId) || parsedId < 1) {
    return res.status(400).json({ message: "ID must be a positive integer!" });
  }

  next();
};

module.exports = {
  validateStudentData,
  validateAllowedUpdates,
  validateId,
};
