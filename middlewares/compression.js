const compression = require('compression');

/**
 * Compression middleware configuration
 * @param {Object} options - Compression options
 */
const compressionMiddleware = (options = {}) => {
  return compression({
    level: options.level || 6,
    threshold: options.threshold || 1024,
    filter: (req, res) => {
      if (req.headers['content-type'] && 
          (req.headers['content-type'].includes('application/json') || 
           req.headers['content-type'].includes('application/x-www-form-urlencoded'))) {
        return compression.filter(req, res);
      }
      return false;
    },
  });
};

module.exports = compressionMiddleware;
