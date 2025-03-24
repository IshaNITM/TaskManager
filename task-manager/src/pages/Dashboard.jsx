// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, setFilter, setSearchQuery, reorderTasks } from '../features/tasks/taskSlice';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterControls from '../components/FilterControls';
import SearchBar from '../components/SearchBar';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery } = useSelector(state => state.tasks);
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = (task) => {
    dispatch(addTask({
      ...task,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    }));
    setShowForm(false);
  };

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
      (filter === 'completed' && task.completed) || 
      (filter === 'active' && !task.completed);
    
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(filteredTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    dispatch(reorderTasks(items));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-controls">
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
        <SearchBar onSearch={handleSearch} />
        <FilterControls currentFilter={filter} onFilterChange={handleFilterChange} />
      </div>
      
      {showForm && <TaskForm onSubmit={handleAddTask} />}
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <TaskList tasks={filteredTasks} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;