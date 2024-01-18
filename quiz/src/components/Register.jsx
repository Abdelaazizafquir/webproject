import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/register.css'; 
function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/register', {
        username,
        password,
      });

      if (response.status === 201) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Registration failed', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <li><Link to="/login" className="login-link">login</Link></li>
      <h2 className="register-title">Register Page</h2>
      <form onSubmit={handleRegister} className="register-form">
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
        <button type="submit" className="register-button">Register</button>
      </form>
      {error && <p className="register-error-message">{error}</p>}
    </div>
  );
}

export default Register;
