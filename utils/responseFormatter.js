const xml2js = require('xml2js');
const { STATUS_CODES, CONTENT_TYPES, MESSAGES } = require('../utils/Constants')

/**
 * Sends a formatted response to the client based on the Content-Type header.
 * @param {Object} res - The response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {string} message - The message to be sent in the response.
 * @param {Object|string} data - The data to be sent in the response.
 * @param {Error} error - The error to be shown in the response.
 */
const sendResponse = (res, statusCode, message, responseData, error) => {
  const contentType = res.get('Content-Type');

  const data = {
    statusCode,
    message,
    data: responseData
  }

  if(statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR && typeof error.error == "string"){
    data.message = error.error;
    data.error = error
  } else {
    data.error = null
  }

  // Handle JSON responses
  if (contentType === CONTENT_TYPES.JSON || !contentType) {
    res.status(statusCode).json(data);
  }
  // Handle URL-encoded responses
  else if (contentType === CONTENT_TYPES.URL_ENCODED) {
    res.status(statusCode).send(data);
  }
  // Handle XML responses
  else if (contentType === CONTENT_TYPES.XML) {
    const builder = new xml2js.Builder();
    const xmlData = builder.buildObject(data);
    res.type(CONTENT_TYPES.XML).status(statusCode).send(xmlData);
  } else {
    res.status(STATUS_CODES.UNSUPPORTED_MEDIA_TYPE).send({ error: 'Unsupported Media Type' });
  }
};

module.exports = sendResponse;
