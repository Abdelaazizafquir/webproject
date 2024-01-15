const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/quizzes/', quizController.getAllQuizzes);
router.get('/Allquizzes/:id', quizController.getAllQuizzesById);
router.post('/quizzes', quizController.createQuiz);
router.get('/quizzes/:id', quizController.getQuizById);
router.delete('/quizzes/:id', quizController.deleteQuizById);


module.exports = router;
