import { createSlice } from '@reduxjs/toolkit';
import { loadTasks, saveTasks } from '../../services/localStorage';

// Load initial tasks or use default empty array
const initialTasks = loadTasks() || [];

const initialState = {
  // Structure for redux-undo
  past: [],
  present: {
    tasks: initialTasks,
    filter: 'all',
    searchQuery: '',
    categories: ['Work', 'Personal', 'Shopping', 'Other']
  },
  future: []
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        completed: false,
      };
      state.present.tasks.push(newTask);
      saveTasks(state.present.tasks);
    },
    toggleTask: (state, action) => {
      const task = state.present.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasks(state.present.tasks);
      }
    },
    updateTask: (state, action) => {
      const index = state.present.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.present.tasks[index] = action.payload;
        saveTasks(state.present.tasks);
      }
    },
    deleteTask: (state, action) => {
      state.present.tasks = state.present.tasks.filter(task => task.id !== action.payload);
      saveTasks(state.present.tasks);
    },
    setFilter: (state, action) => {
      state.present.filter = action.payload;
      saveTasks(state.present.tasks);
    },
    setSearchQuery: (state, action) => {
      state.present.searchQuery = action.payload;
      saveTasks(state.present.tasks);
    },
    reorderTasks: (state, action) => {
      state.present.tasks = action.payload;
      saveTasks(state.present.tasks);
    },
    addCategory: (state, action) => {
      if (!state.present.categories.includes(action.payload)) {
        state.present.categories.push(action.payload);
        saveTasks(state.present.tasks);
      }
    },
  },
});

export const {
  addTask,
  toggleTask,
  updateTask,
  deleteTask,
  setFilter,
  setSearchQuery,
  reorderTasks,
  addCategory,
} = tasksSlice.actions;

// Updated selectors to work with the new structure
export const selectFilteredTasks = (state) => {
  // Handle both possible state structures
  const presentState = state.tasks.present || state.tasks;
  const { tasks = [], filter = 'all', searchQuery = '' } = presentState;
  
  return tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
      (filter === 'completed' && task.completed) || 
      (filter === 'active' && !task.completed);
    
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
};

export const selectCategories = (state) => {
  // Handle both possible state structures
  const presentState = state.tasks.present || state.tasks;
  return presentState.categories || [];
};

export default tasksSlice.reducer;