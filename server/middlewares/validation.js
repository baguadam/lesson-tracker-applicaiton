const validateStudentData = (req, res, next) => {
  const { price, lessonDates } = req.body;
  const acceptableDates = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  if (!Number.isInteger(parseInt(price)) || parseInt(price) < 1) {
    return res
      .status(400)
      .json({ message: "Price must be a positive integer" });
  }

  if (
    !Array.isArray(lessonDates) ||
    !lessonDates.every((lesson) => acceptableDates.includes(lesson))
  ) {
    return res
      .status(400)
      .json({ message: "Lesson dates must be a valid array of weekdays!" });
  }

  next();
};

module.exports = {
  validateStudentData,
};
