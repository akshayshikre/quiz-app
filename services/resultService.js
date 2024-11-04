const { results, Result } = require('../models/resultModel');
const { answers } = require('../models/answerModel');
const { quizzes } = require('../models/quizModel');

/**
 * Calculates the result for a quiz and stores it.
 * @param {string} quizId - ID of the quiz.
 * @param {string} userId - ID of the user.
 * @returns {Result} The calculated Result object.
 */
async function calculateResult(quizId, userId) {

  const userAnswers = answers.filter(ans => ans.quiz_id === quizId && ans.user_id == userId);
  const score = userAnswers.filter(ans => ans.is_correct).length;

  const result = new Result(quizId, userId, score, userAnswers);

  let questions = 0
  const foundQuiz = quizzes.find(quiz => quiz.id === quizId);
  if ( foundQuiz ) {
    questions = foundQuiz.questions.length;
  }
  
  const attempted_questions = userAnswers.length
  const correct_answers = userAnswers.filter(ans => ans.is_correct).length;
  const wrong_answers = userAnswers.filter(ans => !ans.is_correct).length;

  result.summary = {
    questions,
    attempted_questions, 
    correct_answers, 
    wrong_answers
  }

  results.push(result);
  return result;
}

/**
 * Fetches the result of a specific quiz for a user.
 * @param {string} quizId - ID of the quiz.
 * @param {string} userId - ID of the user.
 * @returns {Result|null} Result object or null if not found.
 */
async function getResult(quizId, userId) {
  return results.find(res => res.quiz_id === quizId && res.user_id == userId) || null;
}

module.exports = {
  calculateResult,
  getResult,
};
