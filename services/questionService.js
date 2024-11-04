const { answers, Answer } = require('../models/answerModel');
const { quizzes } = require('../models/quizModel');

/**
 * Submits an answer to a specific question and checks if it's correct.
 * @param {string} userId - ID of the user.
 * @param {string} quizId - ID of the quiz.
 * @param {string} questionId - ID of the question.
 * @param {number} selectedOption - Index of the selected answer.
 * @returns {Answer} The created Answer object with correctness feedback.
 */
async function submitAnswer(userId, quizId, questionId, selectedOption) {
  const quiz = quizzes.find(q => q.id === quizId);
  if (!quiz) throw new Error("Quiz not found");

  const question = quiz.questions.find(q => q.id === questionId);
  if (!question) throw new Error("Question not found");

  const isCorrect = question.correct_option === selectedOption;
  const answer = new Answer(userId, questionId, quizId, selectedOption, isCorrect);
  answers.push(answer);
  return {...answer,correct_option : question.correct_option};
}

module.exports = {
  submitAnswer,
};
