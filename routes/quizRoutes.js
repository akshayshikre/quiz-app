const express = require('express');
const quizController = require('../controllers/quizController');
const { validateCreateQuiz } = require('../middlewares/validation');
const router = express.Router();

router.post('/quizzes', validateCreateQuiz, quizController.createQuiz);
router.get('/quizzes/:quizId', quizController.getQuiz);
router.post('/quizzes/:quizId/submit-answer', quizController.submitAnswer);
router.get('/quizzes/:quizId/results/:userId', quizController.getResults);

module.exports = router;
