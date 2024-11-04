const helmet = require('helmet');

/**
 * Initialize security-related middlewares
 * @param {express.Application} app - The express app instance
 */
module.exports = (app) => {
  app.use(helmet());
  app.disable('x-powered-by');
};
