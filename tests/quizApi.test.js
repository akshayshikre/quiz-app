const request = require('supertest');
const app = require('../app'); // Import your Express app
const { STATUS_CODES } = require('../utils/Constants');

describe('Quiz API Tests', () => {
  let quizId;
  let questionId1;
  let questionId2;
  const userId = 1;

  describe('POST /api/quizzes - Create Quiz', () => {
    it('should create a new quiz and return 201 status', async () => {
      const quizData = {
        title: "Sample Quiz Title",
        questions: [
          {
            text: "What is the capital of India?",
            options: ["Mumbai", "Delhi", "Kashmir", "Pune"],
            correct_option: 1
          },
          {
            text: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correct_option: 0
          }
        ]
      };
      
      const response = await request(app)
        .post('/api/quizzes')
        .send(quizData)
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(STATUS_CODES.CREATED);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe(quizData.title);
      expect(response.body.data.questions).toHaveLength(quizData.questions.length);

      // Store quizId and question IDs for later tests
      quizId = response.body.data.id;
      questionId1 = response.body.data.questions[0].id;
      questionId2 = response.body.data.questions[1].id;
    });
  });

  describe('GET /api/quizzes/:quizId - Get Quiz', () => {
    it('should fetch a quiz by ID and return 200 status', async () => {
      const response = await request(app).get(`/api/quizzes/${quizId}`);
      
      expect(response.status).toBe(STATUS_CODES.SUCCESS);
      expect(response.body.data).toHaveProperty('id', quizId);
      expect(response.body.data).toHaveProperty('title');
      expect(response.body.data).toHaveProperty('questions');
    });
  });

  describe('POST /api/quizzes/:quizId/submit-answer - Submit Answer', () => {
    it('should submit an answer for the first question and return 200 status', async () => {
      const answerData = {
        selectedOption: 1,
        userId,
        questionId:questionId1
      };
      
      const response = await request(app)
        .post(`/api/quizzes/${quizId}/submit-answer`)
        .send(answerData)
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(STATUS_CODES.SUCCESS);
      expect(response.body.data).toHaveProperty('quiz_id', quizId);
      expect(response.body.data).toHaveProperty('question_id', questionId1);
      expect(response.body.data).toHaveProperty('selected_option', answerData.selectedOption);
      expect(response.body.data).toHaveProperty('is_correct');
    });

    it('should submit an answer for the second question and return 200 status', async () => {
      const answerData = {
        selectedOption: 0,
        userId,
        questionId:questionId2
      };
      
      const response = await request(app)
        .post(`/api/quizzes/${quizId}/submit-answer`)
        .send(answerData)
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(STATUS_CODES.SUCCESS);
      expect(response.body.data).toHaveProperty('quiz_id', quizId);
      expect(response.body.data).toHaveProperty('question_id', questionId2);
      expect(response.body.data).toHaveProperty('selected_option', answerData.selectedOption);
      expect(response.body.data).toHaveProperty('is_correct');
    });
  });

  describe('GET /api/quizzes/:quizId/results/:userId - Get Results', () => {
    it('should fetch quiz results for a user and return 200 status', async () => {
      const response = await request(app).get(`/api/quizzes/${quizId}/results/${userId}`);
      
      expect(response.status).toBe(STATUS_CODES.SUCCESS);
      expect(response.body.data).toHaveProperty('quiz_id', quizId);
      expect(response.body.data).toHaveProperty('user_id', ""+userId);
      expect(response.body.data).toHaveProperty('score');
      expect(response.body.data).toHaveProperty('answers');
    });
  });
});
