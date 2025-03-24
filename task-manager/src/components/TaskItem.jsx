// src/components/TaskItem.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../features/tasks/tasksSlice';
import { FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateTask(editedTask));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const getPriorityClass = () => {
    switch (task.priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="task-edit-form">
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              placeholder="Task title"
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleChange}
              placeholder="Task description"
            />
          </div>
          <div className="form-group">
            <select
              name="priority"
              value={editedTask.priority}
              onChange={handleChange}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <div className="task-edit-actions">
            <button className="secondary" onClick={() => setIsEditing(false)}>
              <FiX /> Cancel
            </button>
            <button onClick={handleSave}>
              <FiSave /> Save Changes
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
            />
          </div>
          <div className="task-content">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <div className="task-meta">
              {task.category && <span className="task-category">{task.category}</span>}
              <span className={`task-priority ${getPriorityClass()}`}>
                {task.priority}
              </span>
            </div>
          </div>
          <div className="task-actions">
            <button onClick={handleEdit} className="secondary">
              <FiEdit2 /> Edit
            </button>
            <button onClick={() => onDelete(task.id)} className="danger">
              <FiTrash2 /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;