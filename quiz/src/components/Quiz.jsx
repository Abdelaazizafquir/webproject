import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/quiz/quizzes/${id}`);
        setQuiz(response.data);
        setAnswers(new Array(response.data.questions.length).fill(null));
      } catch (error) {
        console.error('Failed to fetch quiz data', error);
      }
    };

    fetchQuizData();
  }, [id]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleQuizSubmit = async () => {
    try {
      // Validate that all questions have been answered before submission
      if (answers.some((answer) => answer === null)) {
        alert('Please answer all questions before submitting.');
        return;
      }
  
      // Calculate the score based on correct answers
      const calculatedScore = quiz.questions.reduce((acc, question, index) => {
        const correctAnswerIndex = question.correctAnswer;
  
        if (answers[index] === correctAnswerIndex) {
          return acc + 1;
        }
  
        return acc;
      }, 0);
  
      setScore(calculatedScore);
  
      // Assuming you store the user ID in local storage under the key 'userId'
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.user.id;
  
      // Check if userId is available in local storage
      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }
      // Check if a result already exists for this user and quiz
      const existingResult = await axios.get(`http://localhost:3001/result/results/${userId}/${id}`);
     
      if (existingResult.data.message!=="Result not found") {
        // Update the existing result
        await axios.put(`http://localhost:3001/result/results/${existingResult.data._id}`, {
          score: calculatedScore,
        });
      } else {
        // Create a new result
        await axios.post(`http://localhost:3001/result/results`, {
          userId,
          quizId: id,
          score: calculatedScore,
        });
      }
  
      console.log('Quiz submitted successfully.');
  
      // You can perform additional actions, such as redirecting the user or displaying a success message
    } catch (error) {
      console.error('Failed to submit quiz', error);
      // Handle errors (e.g., display an error message to the user)
    }
  };
  

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Quiz Page - {quiz.title}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Render quiz questions and options */}
        {quiz.questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <p>{question.question}</p>
            {/* Render options */}
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="radio"
                  id={optionIndex}
                  name={`question${questionIndex}`}
                  value={optionIndex}
                  checked={answers[questionIndex] === optionIndex}
                  onChange={() => handleOptionChange(questionIndex, optionIndex)}
                />
                <label htmlFor={optionIndex}>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button onClick={handleQuizSubmit}>Submit Quiz</button>
      </form>
      {score !== null && <p>Your score: {score}</p>}
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Quiz;
