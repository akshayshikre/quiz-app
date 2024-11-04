
const answers = [];

class Answer {
  /**
   * Creates a new Answer.
   * @param {string} question_id - ID of the question being answered.
   * @param {number} selected_option - Index of the option selected by the user (0-3).
   * @param {boolean} is_correct - Boolean indicating if the selected answer is correct.
   * @param {string} user_id - Boolean indicating if the selected answer is correct.
   * @param {string} quiz_id - Boolean indicating if the selected answer is correct.
   */
  constructor(user_id, question_id, quiz_id, selected_option, is_correct) {
    this.user_id = user_id;
    this.question_id = question_id;
    this.quiz_id = quiz_id;
    this.selected_option = selected_option;
    this.is_correct = is_correct;
  }
}

module.exports = { answers, Answer };
