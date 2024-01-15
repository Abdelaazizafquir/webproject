import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/home.css'; 

function Home({ onLogout }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const storedSession = localStorage.getItem('user');

    if (storedSession) {
      const user = JSON.parse(storedSession).user;
      setIsLoggedIn(true);
      setUserRole(user.role);
      fetchQuizzes();
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/quiz/quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Failed to fetch quizzes', error);
    }
  };

  const handleLogout = () => {
    // Clear user session from local storage
    localStorage.removeItem('user');
    // Set isLoggedIn to false
    setIsLoggedIn(false);
    // Redirect the user to the login page
    window.location.href = '/login';
  };

  return (
    <div className="home-container">
      <h2>Home Page</h2>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
          {!isLoggedIn && <li><Link to="/register">Register</Link></li>}
          {isLoggedIn && <li><Link to="#" onClick={handleLogout}>Logout</Link></li>}
          {isLoggedIn && (userRole === 'professeur' || userRole === 'admin') && <li><Link to="/createQuiz">Add Quiz</Link></li>}
          {isLoggedIn && userRole === 'admin' && <li><Link to="/admin">Users</Link></li>}
        </ul>
      </nav>
      {isLoggedIn ? (
        <div className="quiz-cards-container">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Please login first.</p>
      )}
    </div>
  );
}

export default Home;
