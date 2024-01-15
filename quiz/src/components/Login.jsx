import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the server's login endpoint
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      });

      // Check if login was successful
      if (response.status === 200) {
        // Store user data or authentication token in local storage
        localStorage.setItem('user', JSON.stringify(response.data));

        // Redirect to the desired page (you can use React Router for this)
        window.location.href = '/'; // Replace with your desired route
      }
    } catch (error) {
      console.error('Login failed', error);
      // Handle login failure
      setError('Invalid username or password');
    }
  };

  return (
    <div>
        <li><Link to="/register">register</Link></li>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
