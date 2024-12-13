// middlewares/errorMiddleware.js
const { AppError } = require('../utils/errors');

const globalErrorHandler = (err, req, res, next) => {
    // Set default error message and status
    let error = { ...err };
    error.message = err.message;
    error.statusCode = err.statusCode

    // Handle operational errors (errors you expect in your application)
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }

    // Handle unexpected errors (programmer errors, bugs, etc.)
    console.error('ERROR:', err);  // Log the full error stack for debugging

    return res.status(error.statusCode).json({
        status: 'error',
        message: 'Something went wrong! Please try again later.',
    });
};

module.exports = globalErrorHandler;
