// src/components/TaskList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toggleTask, deleteTask, reorderTasks } from '../features/tasks/tasksSlice';
import TaskItem from './TaskItem';
import { selectFilteredTasks } from '../features/tasks/tasksSlice';
import EmptyState from './EmptyState';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    dispatch(reorderTasks(items));
  };

  if (tasks.length === 0) {
    return (
      <EmptyState 
        message="No tasks found" 
        subText="Add a new task to get started!"
      />
    );
  }

  return (
    <div className="task-list-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div 
              className="task-list"
              {...provided.droppableProps} 
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      className="draggable-task-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem
                        task={task}
                        onToggle={() => dispatch(toggleTask(task.id))}
                        onDelete={() => dispatch(deleteTask(task.id))}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;