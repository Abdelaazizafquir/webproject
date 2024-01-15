import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuizResult from './QuizResult.jsx';
import { Link } from 'react-router-dom';
import "../style/admin.css";

function Admin() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);

  const fetchData = async (id) => {
    try {
      const idUser = JSON.parse(localStorage.getItem('user')).user.id;
      console.log(idUser);
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
      const newQuiz = {
        title: newQuizTitle,
        questions,
        createdBy: JSON.parse(localStorage.getItem('user')).user.id,
      };

      await axios.post('http://localhost:3001/quiz/quizzes', newQuiz);

      fetchData(JSON.parse(localStorage.getItem('user')).user.id);

      console.log('Quiz created successfully');
    } catch (error) {
      console.error('Failed to create quiz', error);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://localhost:3001/quiz/quizzes/${quizId}`);

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
    <div className="admin-container">
      <h2>professeur Page</h2>
      <li><Link to="/" className="home-link">home</Link></li>

      <div className="create-quiz-section">
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
        <div className="quiz-results-section">
          <button onClick={handleBackToQuizzes}>Back to Quizzes</button>
          <QuizResult quizId={selectedQuizId} />
        </div>
      ) : (
        <div className="quizzes-list-section">
          <h3>Quizzes</h3>
          <table className="quizzes-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz._id}>
                  <td>{quiz.title}</td>
                  <td>
                    <button onClick={() => handleViewResults(quiz._id)}>View Results</button>
                    <button onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;
