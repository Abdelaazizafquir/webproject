import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the server's register endpoint
      const response = await axios.post('http://localhost:3001/auth/register', {
        username,
        password,
      });

      // Check if registration was successful
      if (response.status === 201) {
        // Navigate to the login screen after successful registration
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Registration failed', error);
      // Handle registration failure
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
        <li><Link to="/login">login</Link></li>
      <h2>Register Page</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Register;
