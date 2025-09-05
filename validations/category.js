const Joi = require("joi");

const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(200).optional(),
});

module.exports = { categorySchema };
