const crypto = require("crypto");
const { quizzes, Quiz } = require('../models/quizModel');

/**
 * Creates a new quiz with the given title and questions.
 * @param {string} title - Title of the quiz.
 * @param {Question[]} questionsList - Array of Question objects to include in the quiz.
 * @returns {Quiz} The created Quiz object.
 */
async function createQuiz(title, questionsList) {

  //Create unique ID for Quiz and make sure duplicate is not present in the system
  let quizId = crypto.randomUUID();
  while ( quizzes.findIndex(q => q.id === quizId) > -1 ){
    quizId = crypto.randomUUID();
  }

  //Create unique ID for Questions and make sure duplicate is not present in the system
  questionsList.forEach( question => {
    let questId = crypto.randomUUID();
    while ( questionsList.findIndex(q => q.id === questId) > -1 ){
        questId = crypto.randomUUID();
    }
    question.id = questId;
  })
  
  const newQuiz = new Quiz(quizId, title, questionsList);
  quizzes.push(newQuiz);
  return newQuiz;
}

/**
 * Fetches a quiz by its ID without revealing the correct answers.
 * @param {string} quizId - ID of the quiz to retrieve.
 * @returns {Quiz|null} Quiz object or null if not found.
 */
async function getQuizById(quizId) {
  const quiz = quizzes.find(q => q.id === quizId);
  if (quiz) {
    // Remove correct answers for public view
    const quizCopy = JSON.parse(JSON.stringify(quiz));
    quizCopy.questions.forEach(q => delete q.correct_option);
    return quizCopy;
  }
  return null;
}

module.exports = {
  createQuiz,
  getQuizById,
};
