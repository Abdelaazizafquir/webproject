import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

      // Update the local state or refetch users
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
        // Redirect to home if the user is not an admin
        window.location.href = '/';
      }
    } else {
      // Redirect to home if there is no user session
      window.location.href = '/';
    }
  }, []);

  return (
    <div>
     <li><Link to="/">Home</Link></li>
      <h2>User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.role}
            <div>
              <label>Select Role:</label>
              <select onChange={(e) => updateUserRole(user._id, e.target.value)}>
                <option value="student">Student</option>
                <option value="professeur">professeur</option>
                <option value="admin">admin</option>

              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
