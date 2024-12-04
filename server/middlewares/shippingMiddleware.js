const { body, validationResult } = require('express-validator');

const validateShippingAddress = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('addressLine')
    .notEmpty()
    .withMessage('Address line is required'),
  body('city')
    .notEmpty()
    .withMessage('City is required'),
  body('state')
    .notEmpty()
    .withMessage('State is required'),
  body('postalCode')
    .notEmpty()
    .withMessage('Postal code is required'),
  body('country')
    .notEmpty()
    .withMessage('Country is required'),
  body('phoneNumber')
    .isNumeric()
    .withMessage('Phone number must contain only digits')
    .notEmpty()
    .withMessage('Phone number is required'),
];

// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = {
  validateShippingAddress,
  handleValidationErrors,
};
