const { submitAnswer } = require('./questionService'); // Path to your function
const { quizzes } = require('../models/quizModel');
const { answers } = require('../models/answerModel');

describe('submitAnswer Function', () => {
  beforeEach(() => {
    // Reset mock data before each test
    quizzes.length = 0;
    answers.length = 0;

    // Add mock quiz data
    quizzes.push({
      id: 'quiz1',
      questions: [
        {
          id: 'question1',
          text: "What is the capital of India?",
          options: ["Mumbai", "Delhi", "Kashmir", "Pune"],
          correct_option: 1
        },
        {
          id: 'question2',
          text: "What is the capital of France?",
          options: ["Paris", "London", "Berlin", "Madrid"],
          correct_option: 0
        }
      ]
    });
  });

  it('should submit an answer and return correctness feedback', async () => {
    const userId = 'user1';
    const quizId = 'quiz1';
    const questionId = 'question1';
    const selectedOption = 1; // Correct answer

    const response = await submitAnswer(userId, quizId, questionId, selectedOption);

    expect(response).toHaveProperty('user_id', userId);
    expect(response).toHaveProperty('question_id', questionId);
    expect(response).toHaveProperty('quiz_id', quizId);
    expect(response).toHaveProperty('selected_option', selectedOption);
    expect(response).toHaveProperty('is_correct', true);
    expect(response).toHaveProperty('correct_option', 1); // Correct answer index
  });

  it('should submit an incorrect answer and return correctness feedback', async () => {
    const userId = 'user1';
    const quizId = 'quiz1';
    const questionId = 'question1';
    const selectedOption = 0; // Incorrect answer

    const response = await submitAnswer(userId, quizId, questionId, selectedOption);

    expect(response).toHaveProperty('user_id', userId);
    expect(response).toHaveProperty('question_id', questionId);
    expect(response).toHaveProperty('quiz_id', quizId);
    expect(response).toHaveProperty('selected_option', selectedOption);
    expect(response).toHaveProperty('is_correct', false);
    expect(response).toHaveProperty('correct_option', 1); // Correct answer index
  });

  it('should throw an error if the quiz is not found', async () => {
    const userId = 'user1';
    const quizId = 'nonExistentQuiz';
    const questionId = 'question1';
    const selectedOption = 1;

    await expect(submitAnswer(userId, quizId, questionId, selectedOption))
      .rejects.toThrow("Quiz not found");
  });

  it('should throw an error if the question is not found', async () => {
    const userId = 'user1';
    const quizId = 'quiz1';
    const questionId = 'nonExistentQuestion';
    const selectedOption = 1;

    await expect(submitAnswer(userId, quizId, questionId, selectedOption))
      .rejects.toThrow("Question not found");
  });
});
