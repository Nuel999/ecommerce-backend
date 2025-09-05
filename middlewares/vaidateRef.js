const mongoose = require("mongoose");

const validateRef = (modelName, fieldPath, source = "body") => {
  return async (req, res, next) => {
    try {
      const value =
        source === "body"
          ? req.body[fieldPath]
          : source === "params"
          ? req.params[fieldPath]
          : req.query[fieldPath];

      if (!mongoose.Types.ObjectId.isValid(value)) {
        return res.status(400).json({ error: `${fieldPath} is not a valid ID` });
      }

      const exists = await mongoose.model(modelName).exists({ _id: value });
      if (!exists) {
        return res.status(400).json({ error: `${modelName} with ID ${value} does not exist` });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

module.exports = { validateRef };