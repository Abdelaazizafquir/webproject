const Quiz = require('../models/Quiz');

exports.getAllQuizzes = async (req, res) => {
  try {
    // Fetch all quizzes from the databas
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.getAllQuizzesById = async (req, res) => {
  try {
    // Fetch all quizzes from the databas
    const quizzes = await Quiz.find({createdBy:req.params.id});
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.createQuiz = async (req, res) => {
  const { title, questions,createdBy } = req.body;

  try {
  
    // Create a new quiz with the createdBy field
    const newQuiz = new Quiz({ title, questions, createdBy });
    await newQuiz.save();

    res.status(201).json({ message: 'Quiz created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
