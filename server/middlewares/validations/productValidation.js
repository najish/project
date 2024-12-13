const { body, validationResult } = require('express-validator');

const productValidation = () => [
  // Validate 'name' field
  body('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isString()
    .withMessage('Product name must be a string')
    .isLength({ max: 255 })
    .withMessage('Product name must not exceed 255 characters'),

  // Validate 'description' field
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  // Validate 'price' field
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  // Validate 'stockQuantity' field
  body('stockQuantity')
    .notEmpty()
    .withMessage('Stock quantity is required')
    .isInt({ min: 0 })
    .withMessage('Stock quantity must be a non-negative integer'),

  
  // Validate 'categoryId' field
  body('categoryId')
    .notEmpty()
    .withMessage('Category ID is required')
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { productValidation, handleValidationErrors };
