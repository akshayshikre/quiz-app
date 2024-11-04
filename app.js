//Import Modules
const express = require('express');
const xmlParser = require('express-xml-bodyparser');
const morgan = require('morgan');

//Initializers
const helmetSecurity = require('./initializers/security');
const logger = require('./initializers/logger');
const rateLimit = require('./initializers/rateLimit');

//Routes
const quizRoutes = require('./routes/quizRoutes');

//Middlewares
const compressionMiddleware = require('./middlewares/compression');
const errorHandler = require('./middlewares/errorHandler');

//Config
const config = require('./config/config');
const { STATUS_CODES, MESSAGES } = require('./utils/Constants')

const app = express();

// Middlewares
app.use(express.json()); // For application/json
app.use(express.urlencoded({ extended: true })); // For application/x-www-form-urlencoded
app.use(xmlParser({ explicitArray: false })); // For application/xml
helmetSecurity(app); // Security
logger(app); // Morgan Logging
rateLimit(app); // Rate Limiter
app.use(compressionMiddleware({ level: 6, threshold: 1024 })); //Compression with custom settings

// Global Error Handling for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error.message);
    app.use((req, res, next) => {
      morgan('combined')(req, res, () => {
        sendResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.SERVER_ERROR, null, { error: 'Internal Server Error', message: error.message });
      });
    });
  });
  
  // Global Error Handling for unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    app.use((req, res, next) => {
      morgan('combined')(req, res, () => {
        sendResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.SERVER_ERROR, null, { error: 'Internal Server Error', message: reason });
      });
    });
  });

// Routes
app.use('/api', quizRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;
