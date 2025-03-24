// src/components/TaskForm.jsx
import React, { useState } from 'react';

const TaskForm = ({ onSubmit, onCancel }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    onSubmit(task);
    setTask({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label>Title*</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={task.category}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label>Priority</label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button type="submit">Add Task</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default TaskForm;