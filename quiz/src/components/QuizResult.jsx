import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style/result.css"

function QuizResult({ quizId }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultsResponse = await axios.get(`http://localhost:3001/result/results/get/${quizId}`);
        setResults(resultsResponse.data);
      } catch (error) {
        console.error('Failed to fetch results', error);
        setError('Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId]);

  if (loading) {
    return <p className="loading-message">Loading results...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="quiz-result-container">
      <h3 className="quiz-result-title">Results for Quiz</h3>
      <table className="result-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="result-item">
              <td>{result.userId.username}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuizResult;
