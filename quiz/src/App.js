import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Admin from './components/Admin';
import UserManagement from './components/UserManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/createQuiz" element={<Admin />} />
        <Route path="/admin" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
