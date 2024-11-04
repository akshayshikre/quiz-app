const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNSUPPORTED_MEDIA_TYPE: 415,
    INTERNAL_SERVER_ERROR: 500,
  };

  const MESSAGES = {
    QUIZ_CREATED: "Quiz Created Successfully",
    SERVER_ERROR: "Internal Server Error",
    QUIZ_FOUND: "Quiz Found Successfully",
    QUIZ_NOT_FOUND: "Quiz Not Found",
    ANSWER_POSTED: "Answer Submitted Successfully",
    RESULT_FOUND: "Result Found Successfully",
    RESULT_NOT_FOUND: "Result Not Found",
  }

  const CONTENT_TYPES = {
    JSON: 'application/json',
    XML: 'application/xml',
    URL_ENCODED: 'application/x-www-form-urlencoded'
  }
  
  module.exports = {
    STATUS_CODES,
    MESSAGES,
    CONTENT_TYPES
  };
  