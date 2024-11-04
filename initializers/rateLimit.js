const rateLimit = require('express-rate-limit');

/**
 * Initialize rate limiting for the application
 * @param {express.Application} app - The express app instance
 */
module.exports = (app) => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
  });

  app.use(limiter);
};
