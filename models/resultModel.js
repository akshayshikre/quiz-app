
const results = [];

class Result {
  /**
   * Creates a new Result.
   * @param {string} quiz_id - ID of the quiz taken.
   * @param {string} user_id - ID of the user who took the quiz.
   * @param {number} score - The user's score based on correct answers.
   * @param {Answer[]} answers - Array of Answer objects with the user's submitted answers.
   */
  constructor(quiz_id, user_id, score, answers = []) {
    this.quiz_id = quiz_id;
    this.user_id = user_id;
    this.score = score;
    this.answers = answers;
  }
}

module.exports = { results, Result };
