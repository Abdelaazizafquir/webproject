// Admin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function QuizResult({ quizId }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetch results from the server for a specific quiz
        const resultsResponse = await axios.get(`http://localhost:3001/result/results/get/${quizId}`);
        setResults(resultsResponse.data);
      } catch (error) {
        console.error('Failed to fetch results', error);
      }
    };

    fetchResults();
  }, [quizId]);

  return (
    <div>
      <h3>Results for Quiz</h3>
      {/* Display quiz results with user and quiz details */}
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            User: {result.userId.username} | Score: {result.score}
          </li>
        ))}
      </ul>
    </div>
  );
}



export default QuizResult;
