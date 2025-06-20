// Handles requests for routes that don't exist
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next middleware (our general error handler)
};

// General error handler
// This middleware will catch any error passed to next()
const errorHandler = (err, req, res, next) => {
  // If the status code is still 200, it means an error occurred but no specific status was set.
  // In that case, default to 500 (Internal Server Error).
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    // In a development environment, you might want to see the stack trace.
    // In production, you would not include this for security reasons.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };