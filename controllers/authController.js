const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { loginSchema, registerSchema } = require("../validations/user");
const bcrypt = require("bcryptjs");

// Log messages with a prefix for clarity
const log = (message) => console.log(message);

const register = async (req, res) => {
  // Pass the entire request body to Joi, and set { abortEarly: false } to get all validation errors at once
  const { error, value } = registerSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    // If validation fails, extract the error messages
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors });
  }

  try {
    const { email, password, username, role } = value;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
      username,
      role: process.env.NODE_ENV === "test" && role ? role : "user", // default role is "user"
    });

    await user.save();

    const payload = {
      id: user.id,
      role: user.role,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ msg: "User registered successfully", token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  log(`Login attempt for: ${req.body.email}`);
  const { error, value } = loginSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors });
  }

  const { email, password } = value;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { role: user.role, id: user.id } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { register, login };
