// src/components/TaskItem.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../features/tasks/taskSlice';

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

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="task-edit-form">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
          </div>
          <div className="task-content">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <div className="task-meta">
              {task.category && <span className="task-category">{task.category}</span>}
              <span 
                className="task-priority" 
                style={{ backgroundColor: getPriorityColor() }}
              >
                {task.priority}
              </span>
            </div>
          </div>
          <div className="task-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;