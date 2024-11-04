const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

/**
 * Initialize logging with morgan
 * @param {express.Application} app - The express app instance
 */
module.exports = (app) => {
  // Setup morgan logging with rotation for requests
  const logStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: logStream }));
  app.use(morgan('dev')); // Logs to console for development
};
