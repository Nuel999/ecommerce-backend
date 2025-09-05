const express = require("express");
const { register, login } = require("../controllers/authController");
const validate = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../validations/user");

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

// router.post("/register", registerSchema);
// router.post("/login", loginSchema); // for testing 


module.exports = router;
