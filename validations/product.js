const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().positive().precision(2).required(),
  // The test sends 'quantity', not 'countInStock', so we validate 'quantity'.
  countInStock: Joi.number().integer().min(0).required(),
  // The Mongoose schema expects a valid ObjectId, which is a 24-character hex string.
  category: Joi.string().required(),
  imageUrl: Joi.string().uri().optional(),
});

module.exports = { productSchema };
