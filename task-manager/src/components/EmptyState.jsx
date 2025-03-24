// src/components/EmptyState.jsx
import React from 'react';
import { FiInbox } from 'react-icons/fi';
import { FiPlusCircle } from 'react-icons/fi';

const EmptyState = ({ 
  message = "No tasks found", 
  subText = "Create your first task to get started",
  iconSize = 48
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <div className="empty-state-icon">
          <FiInbox size={iconSize} />
        </div>
        <h3 className="empty-state-title">{message}</h3>
        <p className="empty-state-subtext">{subText}</p>
        <div className="empty-state-action">
          <FiPlusCircle className="action-icon" />
          <span>Add New Task</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;