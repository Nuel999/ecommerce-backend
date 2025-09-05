
const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // validate request body from joi schema and joi will collect all validation errors
    if (error) {
      const errors = error.details.map((detail) => detail.message); // if there are errors, map them to a simple array of messages 
      return res.status(400).json({ errors });
    }
    next();
  };
};

module.exports = validate;