const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.statusCode = err.status || 'failed';

  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
};

module.exports = globalErrorHandler;
