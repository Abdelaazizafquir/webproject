const Result = require('../models/Result');
const User = require('../models/User');
const Quiz = require('../models/Quiz');

exports.createResult = async (req, res) => {
  try {
    const { userId, quizId, score } = req.body;

    // Check if a result already exists for the given user and quiz
    const existingResult = await Result.findOne({ userId, quizId });

    if (existingResult) {
      // If a result already exists, update the score
      existingResult.score = score;
      await existingResult.save();
      res.status(200).json({ message: 'Result updated successfully' });
    } else {
      // Create a new result
      const newResult = new Result({ userId, quizId, score });
      await newResult.save();
      res.status(201).json({ message: 'Result created successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllResults = async (req, res) => {
  try {
    // Fetch results from the database, populating the 'userId' and 'quizId' fields
    const results = await Result.find()
      .populate('userId', 'username') // Populate the 'userId' field from the 'User' collection and retrieve only the 'username' field
      .populate('quizId', 'title') // Populate the 'quizId' field from the 'Quiz' collection and retrieve only the 'title' field
      .exec();

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getResultById = async (req, res) => {
  try {
    const result = await Result.find({quizId:req.params.id})
      .populate('userId', 'username') // Populate the 'userId' field from the 'User' collection and retrieve only the 'username' field
      .populate('quizId', 'title'); // Populate the 'quizId' field from the 'Quiz' collection and retrieve only the 'title' field

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getResultByUserIdAndQuizId = async (req, res) => {
  try {
    const { userId, quizId } = req.params;

    const result = await Result.findOne({ userId, quizId })
      .populate('userId', 'username') // Populate the 'userId' field from the 'User' collection and retrieve only the 'username' field
      .populate('quizId', 'title'); // Populate the 'quizId' field from the 'Quiz' collection and retrieve only the 'title' field

    if (!result) {
      return res.send({ message: 'Result not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateResultById = async (req, res) => {
  try {
    const { userId, quizId, score } = req.body;

    const result = await Result.findByIdAndUpdate(
      req.params.id,
      { userId, quizId, score },
      { new: true }
    )
      .populate('userId', 'username') // Populate the 'userId' field from the 'User' collection and retrieve only the 'username' field
      .populate('quizId', 'title'); // Populate the 'quizId' field from the 'Quiz' collection and retrieve only the 'title' field

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.status(200).json({ message: 'Result updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteResultById = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id)
      .populate('userId', 'username') // Populate the 'userId' field from the 'User' collection and retrieve only the 'username' field
      .populate('quizId', 'title'); // Populate the 'quizId' field from the 'Quiz' collection and retrieve only the 'title' field

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
