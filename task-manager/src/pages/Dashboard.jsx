import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, setFilter, setSearchQuery, reorderTasks } from '../features/tasks/tasksSlice';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterControls from '../components/FilterControls';
import SearchBar from '../components/SearchBar';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { Add } from '@mui/icons-material';

const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { tasks, filter, searchQuery } = useSelector(state => state.tasks.present);
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
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
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
    <Box className="dashboard" sx={{ pb: 4 }}>
      <Box className="dashboard-controls" sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mb: 3,
        alignItems: { xs: 'stretch', sm: 'center' }
      }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowForm(!showForm)}
          sx={{
            bgcolor: '#3498db',
            '&:hover': { bgcolor: '#2980b9' },
            alignSelf: { xs: 'stretch', sm: 'flex-start' },
            order: { xs: 1, sm: 0 }
          }}
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </Button>
        
        <Box sx={{ 
          display: 'flex',
          gap: 2,
          order: { xs: 2, sm: 0 },
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%'
        }}>
          <SearchBar onSearch={handleSearch} />
          <FilterControls currentFilter={filter} onFilterChange={handleFilterChange} />
        </Box>
      </Box>
      
      {showForm && (
        <Box sx={{ mb: 3 }}>
          <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />
        </Box>
      )}
      
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
    </Box>
  );
};

export default Dashboard;