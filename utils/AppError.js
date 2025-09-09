class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // call the parent Error constructor
    this.statusCode = statusCode; // custom property for HTTP status (e.g. 404, 500)
    this.isOperational = true; // flag to mark expected ("operational") errors

    // captures the stack trace, excluding this constructor
    Error.captureStackTrace(this, this.constructor);
  }
}
