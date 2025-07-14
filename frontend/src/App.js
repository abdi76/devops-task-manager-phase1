import React, { useState, useEffect } from 'react';
import './App.css';
import AuthForm from './components/AuthForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { authService } from './services/authService';
import { taskService } from './services/taskService';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      authService.setToken(token);
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);
      setUser({ authenticated: true });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('access_token', response.access_token);
      authService.setToken(response.access_token);
      await fetchTasks();
      setError(null);
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (credentials) => {
    try {
      const response = await authService.register(credentials);
      localStorage.setItem('access_token', response.access_token);
      authService.setToken(response.access_token);
      await fetchTasks();
      setError(null);
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    authService.setToken(null);
    setUser(null);
    setTasks([]);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Task Manager - DevOps Showcase</h1>
        <p className="subtitle">Phase 1: Foundation Development</p>
        {user && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </header>
      
      {error && <div className="error-message">{error}</div>}
      
      <main className="main-content">
        {user ? (
          <div className="dashboard">
            <div className="dashboard-header">
              <h2>Welcome to Your Task Dashboard</h2>
              <p>Manage your tasks efficiently</p>
            </div>
            <TaskForm onTaskCreated={fetchTasks} />
            <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
          </div>
        ) : (
          <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
        )}
      </main>
      
      <footer className="app-footer">
        <p>DevOps Task Manager - Phase 1 | Built with React & FastAPI</p>
      </footer>
    </div>
  );
}

export default App;
