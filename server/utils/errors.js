// utils/errors.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // to distinguish operational errors from programmer errors
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}



class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

class DatabaseError extends AppError {
  constructor(message = 'Database Operation Failed', statusCode = 500) {
    super(message, statusCode);
  }
}

module.exports = { AppError, NotFoundError, BadRequestError, DatabaseError };
