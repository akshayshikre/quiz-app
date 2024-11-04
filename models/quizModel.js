
const quizzes = [];

class Quiz {
  /**
   * Creates a new Quiz.
   * @param {string} id - Unique identifier for the quiz.
   * @param {string} title - Title of the quiz.
   * @param {Question[]} questions - List of Question objects for the quiz.
   */
  constructor(id, title, questions = []) {
    this.id = id;
    this.title = title;
    this.questions = questions;
  }
}

module.exports = { quizzes, Quiz };
