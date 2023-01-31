class AppError extends Error {
  // "User not found" 404
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.statusCode = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
    this.isoperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
