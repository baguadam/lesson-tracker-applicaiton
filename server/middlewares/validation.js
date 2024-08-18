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
  validateAllowedUpdates,
  validateId,
};
