const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let msg = err.message;

  // If Mongoose not found error, set to 404 and change message
  // e.g. invalid id passed to a Mongoose query
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    msg = 'Resource not found';
  }

  res.status(statusCode).json({
    message: msg,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
