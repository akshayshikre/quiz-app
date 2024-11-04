const { createQuiz, getQuizById } = require('./quizService');
const { quizzes } = require('../models/quizModel');

describe('quizService Tests', () => {
  beforeEach(() => {
    // Clear quizzes array before each test to avoid conflicts
    quizzes.length = 0;
  });

  describe('createQuiz', () => {
    it('should create a new quiz with a unique ID and unique question IDs', async () => {
      const title = "Sample Quiz";
      const questions = [
        { text: "What is the capital of India?", options: ["Mumbai", "Delhi", "Kashmir", "Pune"], correct_option: 1 },
        { text: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correct_option: 0 }
      ];

      const newQuiz = await createQuiz(title, questions);

      // Check that the quiz has been created with a unique ID
      expect(newQuiz).toHaveProperty('id');
      expect(newQuiz.id).toBeDefined();
      expect(newQuiz.title).toBe(title);
      expect(newQuiz.questions).toHaveLength(questions.length);

      // Check that each question has a unique ID
      const questionIds = newQuiz.questions.map(q => q.id);
      const uniqueQuestionIds = new Set(questionIds);
      expect(uniqueQuestionIds.size).toBe(questionIds.length); // Ensures IDs are unique

      // Check that the quiz is added to quizzes array
      expect(quizzes).toContainEqual(newQuiz);
    });

    it('should prevent duplicate quiz and question IDs', async () => {
      const title1 = "First Quiz";
      const title2 = "Second Quiz";
      const questions1 = [
        { text: "What is the capital of Spain?", options: ["Madrid", "Barcelona", "Seville", "Valencia"], correct_option: 0 },
      ];
      const questions2 = [
        { text: "What is the capital of Italy?", options: ["Rome", "Milan", "Venice", "Florence"], correct_option: 0 },
      ];

      const quiz1 = await createQuiz(title1, questions1);
      const quiz2 = await createQuiz(title2, questions2);

      // Ensure quizzes have unique IDs
      expect(quiz1.id).not.toBe(quiz2.id);

      // Ensure question IDs in each quiz are unique
      const questionIds1 = quiz1.questions.map(q => q.id);
      const uniqueQuestionIds1 = new Set(questionIds1);
      expect(uniqueQuestionIds1.size).toBe(questionIds1.length);

      const questionIds2 = quiz2.questions.map(q => q.id);
      const uniqueQuestionIds2 = new Set(questionIds2);
      expect(uniqueQuestionIds2.size).toBe(questionIds2.length);
    });
  });

  describe('getQuizById', () => {
    it('should fetch a quiz by ID without revealing the correct answers', async () => {
      const title = "Hidden Answers Quiz";
      const questions = [
        { text: "What is the capital of Germany?", options: ["Berlin", "Hamburg", "Munich", "Cologne"], correct_option: 0 },
        { text: "What is the capital of Japan?", options: ["Tokyo", "Osaka", "Kyoto", "Nagoya"], correct_option: 0 }
      ];

      const newQuiz = await createQuiz(title, questions);
      const fetchedQuiz = await getQuizById(newQuiz.id);

      // Check that the fetched quiz is the same as the created quiz
      expect(fetchedQuiz).toHaveProperty('id', newQuiz.id);
      expect(fetchedQuiz.title).toBe(title);
      expect(fetchedQuiz.questions).toHaveLength(questions.length);

      // Check that correct answers are removed from the fetched quiz
      fetchedQuiz.questions.forEach(question => {
        expect(question).not.toHaveProperty('correct_option');
      });
    });

    it('should return null if the quiz ID does not exist', async () => {
      const nonExistentQuizId = "non-existent-id";
      const fetchedQuiz = await getQuizById(nonExistentQuizId);
      
      // Check that fetching a non-existent quiz returns null
      expect(fetchedQuiz).toBeNull();
    });
  });
});
