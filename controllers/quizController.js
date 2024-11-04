const quizService = require('../services/quizService');
const questionService = require('../services/questionService');
const resultService = require('../services/resultService');
const sendResponse = require('../utils/responseFormatter');
const { STATUS_CODES, MESSAGES} = require('../utils/Constants')

/**
 * Handle quiz creation
 * @param {Object} req - The request object containing quiz details.
 * @param {Object} res - The response object to send data back to the client.
 */
exports.createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  try {
    const quiz = await quizService.createQuiz(title, questions);
    sendResponse(res, STATUS_CODES.CREATED, MESSAGES.QUIZ_CREATED, quiz, null);
  } catch (error) {
    sendResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.SERVER_ERROR, null, { error: error.message });
  }
};

/**
 * Fetch a quiz by ID without answers
 * @param {Object} req - The request object containing the quiz ID.
 * @param {Object} res - The response object to send data back to the client.
 */
exports.getQuiz = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await quizService.getQuizById(quizId);
    if (quiz) {
      sendResponse(res, STATUS_CODES.SUCCESS, MESSAGES.QUIZ_FOUND, quiz, null);
    } else {
      sendResponse(res, STATUS_CODES.NOT_FOUND, MESSAGES.QUIZ_NOT_FOUND, null, null);
    }
  } catch (error) {
    sendResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.SERVER_ERROR, null, { error: error.message });
  }
};

/**
 * Submit answers to a quiz question
 * @param {Object} req - The request object containing quizId and questionId.
 * @param {Object} res - The response object to send data back to the client.
 */
exports.submitAnswer = async (req, res) => {
  const { quizId } = req.params;
  const { selectedOption, userId, questionId} = req.body;
  try {
    const answer = await questionService.submitAnswer(
      userId,
      quizId,
      questionId,
      selectedOption
    );
    sendResponse(res, STATUS_CODES.SUCCESS, MESSAGES.ANSWER_POSTED, answer, null);
  } catch (error) {
    sendResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.SERVER_ERROR, null, { error: error.message });
  }
};

/**
 * Fetch quiz results for a specific user
 * @param {Object} req - The request object containing quizId and userId.
 * @param {Object} res - The response object to send data back to the client.
 */
exports.getResults = async (req, res) => {
  const { quizId, userId } = req.params;
  try {
    const result = await resultService.calculateResult(quizId,userId);
    if (result) {
      sendResponse(res, STATUS_CODES.SUCCESS, MESSAGES.RESULT_FOUND, result, null);
    } else {
      sendResponse(res, STATUS_CODES.NOT_FOUND, MESSAGES.RESULT_NOT_FOUND, null, null);
    }
  } catch (error) {
    sendResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.SERVER_ERROR, null, { error: error.message });
  }
};
