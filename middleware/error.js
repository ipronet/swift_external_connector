const { logger } = require("../logs/winston");
const ErrorResponse = require("../utls/errorResponse");
const errorHandler = (err, req, res, next) => {

  let error = { ...err };
  error.message = err.message;
  //Log to console for dev
  logger.error(error);
   console.log(error);
  //mysql bad ObjectId
  if (err.code === "ER_DUP_ENTRY") {
    const message = `Duplicate entry found in request`;
    logger.error(message);
    error = new ErrorResponse(message, 404);
  }
  

    //mysql db access denied to user
    if (err.code === "ER_DBACCESS_DENIED_ERROR") {
      const message = `Db Access Denied`;
      logger.error(message);
      error = new ErrorResponse(message, 404);
    }

  if (err.code === "ER_BAD_FIELD_ERROR") {
    const message = `Unknown column in request`;
    logger.error(message);
    error = new ErrorResponse(message, 404);
  }

  if (err.code === "ER_TABLE_EXISTS_ERROR") {
    const message = `Table already exist`;
    logger.error(message);
    error = new ErrorResponse(message, 404);
  }
  if (err.code === "ER_NO_SUCH_TABLE") {
    const message = `Unknown table in request`;
    logger.error(message);
    error = new ErrorResponse(message, 404);
  }
  if (err.code === "EHOSTUNREACH") {
    const message = `Server Failed to connect`;
    logger.error(message);
    return res.status(500).json({
      Status: 0,
      Message:message,
    });
  }
  if (err.code === "ETIMEDOUT") {
    const message = `System Failed to initialize`;
    logger.error(message);
    return res.status(500).json({
      Status: 0,
      Message:message,
    });
  }
  //Mongo duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }
  //mongoose validation errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    Status: 0,
    Message: error.message || "Server Error",
  });
};

module.exports = errorHandler;
