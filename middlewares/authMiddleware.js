// middlewares/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");

// Verify JWT token
const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Get token from "Bearer <token>"
  }

  if (!token) {
    return next(new AppError("Not authorized, no token", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    // Attach user to request (exclude password)
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return next(new AppError("User not found", 401));
    }

    next();
  } catch (err) {
    console.error("JWT error:", err);
    return next(new AppError("Not authorized, token failed", 401));
  }
};



// Restrict to admins only
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return next(new AppError("Not authorized as admin", 403));
  }
};

module.exports = { verifyToken, isAdmin };
