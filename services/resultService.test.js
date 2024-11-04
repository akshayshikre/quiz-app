const { calculateResult, getResult } = require('./resultService');
const { answers } = require('../models/answerModel');
const { quizzes } = require('../models/quizModel');
const { results } = require('../models/resultModel');

describe('resultService Tests', () => {
  beforeEach(() => {
    // Clear mock data arrays before each test to avoid conflicts
    quizzes.length = 0;
    answers.length = 0;
    results.length = 0;
  });

  describe('calculateResult', () => {
    it('should calculate the result for a quiz and store it', async () => {
      // Mock quiz data
      const quizId = 'quiz1';
      const userId = 'user1';
      quizzes.push({
        id: quizId,
        questions: [
          { id: 'question1' },
          { id: 'question2' },
          { id: 'question3' }
        ]
      });

      // Mock user answers
      answers.push(
        { quiz_id: quizId, user_id: userId, question_id: 'question1', is_correct: true },
        { quiz_id: quizId, user_id: userId, question_id: 'question2', is_correct: false },
        { quiz_id: quizId, user_id: userId, question_id: 'question3', is_correct: true }
      );

      // Calculate result
      const result = await calculateResult(quizId, userId);

      // Check the returned result properties
      expect(result).toHaveProperty('quiz_id', quizId);
      expect(result).toHaveProperty('user_id', userId);
      expect(result).toHaveProperty('score', 2); // 2 correct answers
      expect(result).toHaveProperty('summary');
      expect(result.summary).toEqual({
        questions: 3,
        attempted_questions: 3,
        correct_answers: 2,
        wrong_answers: 1
      });

      // Check that result is added to results array
      expect(results).toContainEqual(result);
    });

    it('should handle zero attempted questions and return zero scores', async () => {
      const quizId = 'quiz2';
      const userId = 'user2';
      quizzes.push({
        id: quizId,
        questions: [
          { id: 'question1' },
          { id: 'question2' }
        ]
      });

      // No answers added for this user

      // Calculate result
      const result = await calculateResult(quizId, userId);

      // Check the result properties
      expect(result).toHaveProperty('quiz_id', quizId);
      expect(result).toHaveProperty('user_id', userId);
      expect(result).toHaveProperty('score', 0); // No correct answers
      expect(result).toHaveProperty('summary');
      expect(result.summary).toEqual({
        questions: 2,
        attempted_questions: 0,
        correct_answers: 0,
        wrong_answers: 0
      });

      // Check that result is added to results array
      expect(results).toContainEqual(result);
    });
  });

  describe('getResult', () => {
    it('should fetch the result for a specific quiz and user', async () => {
      const quizId = 'quiz1';
      const userId = 'user1';

      // Add a result to results array
      const mockResult = {
        quiz_id: quizId,
        user_id: userId,
        score: 2,
        summary: {
          questions: 3,
          attempted_questions: 3,
          correct_answers: 2,
          wrong_answers: 1
        }
      };
      results.push(mockResult);

      // Fetch the result
      const result = await getResult(quizId, userId);

      // Verify the fetched result
      expect(result).toEqual(mockResult);
    });

    it('should return null if no result is found for the given quizId and userId', async () => {
      const quizId = 'nonExistentQuiz';
      const userId = 'nonExistentUser';

      // Fetch the result
      const result = await getResult(quizId, userId);

      // Verify that no result is returned
      expect(result).toBeNull();
    });
  });
});
