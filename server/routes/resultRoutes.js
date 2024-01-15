const express = require('express');
const resultController = require('../controllers/resultController');
const router = express.Router();

// Create a new result for a specific quiz
router.post('/results', resultController.createResult);

// Get all results
router.get('/results', resultController.getAllResults);

router.get('/results/get/:id', resultController.getResultById);


// Get result by user ID and quiz ID
router.get('/results/:userId/:quizId', resultController.getResultByUserIdAndQuizId);

// Update result by ID
router.put('/results/:id', resultController.updateResultById);

// Delete result by ID
router.delete('/results/:id', resultController.deleteResultById);

module.exports = router;
