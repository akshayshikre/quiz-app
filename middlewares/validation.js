const { body, validationResult } = require('express-validator');
const { STATUS_CODES } = require('../utils/Constants')

/**
 * Validates incoming request data
 */
const validateCreateQuiz = [
  body('title').notEmpty().withMessage('Title is required'),
  body('questions').isArray().withMessage('Questions must be an array'),
  body('questions.*.text').notEmpty().withMessage('Question text is required'),
  body('questions.*.options').isArray({ min: 4, max: 4 }).withMessage('Each question must have 4 options'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Validation Error",errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateCreateQuiz,
};
