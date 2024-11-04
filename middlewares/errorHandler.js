const { STATUS_CODES } = require('../utils/Constants')

/**
 * Error handling middleware
 * @param {Error} err - The error object
 * @param {express.Request} req - The express request object
 * @param {express.Response} res - The express response object
 * @param {express.NextFunction} next - The next middleware function
 */
module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: {
        message: err.message || 'Internal Server Error',
        status: err.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
      },
    });
  };
  