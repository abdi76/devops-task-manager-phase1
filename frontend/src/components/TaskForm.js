import React, { useState } from 'react';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormData({ title: '', description: '', priority: 'medium' });
        if (onTaskCreated) onTaskCreated();
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="task-form-container">
      <h3>Create New Task</h3>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        
        <button type="submit" className="submit-btn">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
