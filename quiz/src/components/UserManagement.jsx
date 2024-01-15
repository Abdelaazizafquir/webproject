import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/users.css';

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/User/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await axios.put('http://localhost:3001/User/users/update-role', {
        userId,
        newRole,
      });

      fetchUsers();
    } catch (error) {
      console.error('Failed to update user role', error);
    }
  };

  useEffect(() => {
    const storedSession = localStorage.getItem('user');
    if (storedSession) {
      const user = JSON.parse(storedSession).user;
      if (user.role !== 'admin') {
        window.location.href = '/';
      }
    } else {
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="user-management-container">
      <li><Link to="/" className="link-home">Home</Link></li>
      <h2 className="user-management-title">User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <label>Select Role:</label>
                <select
                  className="user-role-select"
                  onChange={(e) => updateUserRole(user._id, e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="professeur">professeur</option>
                  <option value="admin">admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
