
const questions = [];

class Question {
  /**
   * Creates a new Question.
   * @param {string} id - Unique identifier for the question.
   * @param {string} text - The question text.
   * @param {string[]} options - Array of 4 answer options.
   * @param {number} correct_option - Index of the correct answer within options array (0-3).
   */
  constructor(id, text, options = [], correct_option) {
    this.id = id;
    this.text = text;
    this.options = options;
    this.correct_option = correct_option;
  }
}

module.exports = { questions, Question };
