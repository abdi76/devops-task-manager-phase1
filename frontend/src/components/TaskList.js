import React from 'react';

const TaskList = ({ tasks, onTaskUpdated }) => {
  const handleToggleComplete = async (taskId, completed) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: !completed })
      });
      
      if (response.ok && onTaskUpdated) {
        onTaskUpdated();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok && onTaskUpdated) {
          onTaskUpdated();
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className="task-list-container">
      <h3>Your Tasks ({tasks.length})</h3>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet. Create your first task above!</p>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <h4>{task.title}</h4>
                {task.description && <p>{task.description}</p>}
                <div className="task-meta">
                  <span className={`priority ${task.priority}`}>{task.priority}</span>
                  <span className="created">
                    Created: {new Date(task.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="task-actions">
                <button
                  onClick={() => handleToggleComplete(task.id, task.completed)}
                  className={`toggle-btn ${task.completed ? 'completed' : ''}`}
                >
                  {task.completed ? '✓' : '○'}
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="delete-btn"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
