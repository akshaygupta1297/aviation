const mongoose = require("mongoose");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!typeof (error == ApiError)) {
    const statusCode =
      error.statusCode || typeof (error == mongoose.Error)
        ? httpStatus.status.BAD_REQUEST
        : httpStatus.status.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus.status[statusCode];
    error = new ApiError(statusCode, message, false);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if ("development" === "production" && !err.isOperational) {
    statusCode = httpStatus.status.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.status.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    status: "ERROR",
    code: statusCode,
    message,
    ...("development" === "development" && {}),
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
