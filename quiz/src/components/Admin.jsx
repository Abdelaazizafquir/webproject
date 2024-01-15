import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuizResult from './QuizResult.jsx';
import { Link } from 'react-router-dom';

function Admin() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);

  const fetchData = async (id) => {
    try {
      const idUser=JSON.parse(localStorage.getItem('user')).user.id;
      console.log(idUser);
      // Fetch quizzes from the server
      const quizzesResponse = await axios.get(`http://localhost:3001/quiz/Allquizzes/${idUser}`);
      setQuizzes(quizzesResponse.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  useEffect(() => {
    const storedSession = localStorage.getItem('user');

    if (storedSession) {
      const user = JSON.parse(storedSession).user;
      const professorId = user.id;

      if (user.role !== 'professeur' && user.role !== 'admin') {
        window.location.href = '/';
      } else {
        fetchData(professorId);
      }
    } else {
      window.location.href = '/';
    }
  }, []);

  const handleCreateQuiz = async () => {
    try {
      // Create a new quiz object
      const newQuiz = {
        title: newQuizTitle,
        questions,
        createdBy: JSON.parse(localStorage.getItem('user')).user.id,
      };

      // Send the new quiz to the server using Axios
      await axios.post('http://localhost:3001/quiz/quizzes', newQuiz);

      // Refresh the list of quizzes after creating a new quiz
      fetchData(JSON.parse(localStorage.getItem('user')).user.id);

      console.log('Quiz created successfully');
    } catch (error) {
      console.error('Failed to create quiz', error);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      // Send the delete request to the server using Axios
      await axios.delete(`http://localhost:3001/quiz/quizzes/${quizId}`);

      // Refresh the list of quizzes after deleting one
      fetchData(JSON.parse(localStorage.getItem('user')).user.id);
      console.log('Quiz deleted successfully');
    } catch (error) {
      console.error('Failed to delete quiz', error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleViewResults = (quizId) => {
    setSelectedQuizId(quizId);
  };

  const handleBackToQuizzes = () => {
    setSelectedQuizId(null);
  };

  return (
    <div>
      <h2>professeur Page</h2>
      <li><Link to="/">home</Link></li>
      {/* Display Create Quiz component */}
      <div>
        <h3>Create Quiz</h3>
        <label>Title:</label>
        <input type="text" value={newQuizTitle} onChange={(e) => setNewQuizTitle(e.target.value)} />
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <label>Question {questionIndex + 1}:</label>
            <input
              type="text"
              value={question.question}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[questionIndex].question = e.target.value;
                setQuestions(updatedQuestions);
              }}
            />
            <label>Options:</label>
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
              />
            ))}
            <label>Correct Answer Index:</label>
            <input
              type="number"
              value={question.correctAnswer}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[questionIndex].correctAnswer = Number(e.target.value);
                setQuestions(updatedQuestions);
              }}
            />
          </div>
        ))}
        <button onClick={handleAddQuestion}>Add Question</button>
        <button onClick={handleCreateQuiz}>Create Quiz</button>
      </div>

      {selectedQuizId ? (
        // Display Quiz Results for the selected quiz
        <div>
          <button onClick={handleBackToQuizzes}>Back to Quizzes</button>
          <QuizResult quizId={selectedQuizId} />
        </div>
      ) : (
        // Display list of quizzes with view and delete options
        <div>
          <h3>Quizzes</h3>
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz._id}>
                {quiz.title} -{' '}
                <button onClick={() => handleViewResults(quiz._id)}>View Results</button>
                <button onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Admin;