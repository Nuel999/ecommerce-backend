class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Helps distinguish expected vs unexpected errors
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError