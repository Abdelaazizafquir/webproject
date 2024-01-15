import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/register.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="register-container">
      <li><Link to="/register" className="register-link">register</Link></li>
      <h2 className="register-title">Login Page</h2>
      <form onSubmit={handleLogin} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <button type="submit" className="register-button">Login</button>
      </form>
      {error && <p className="register-error-message">{error}</p>}
    </div>
  );
}

export default Login;
