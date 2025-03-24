// src/components/TaskList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../features/tasks/taskSlice';
import TaskItem from './TaskItem';
import { Draggable } from 'react-beautiful-dnd';

const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleTask(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found. Add a new task to get started!</p>
      ) : (
        tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TaskItem
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </Draggable>
        ))
      )}
    </div>
  );
};

export default TaskList;