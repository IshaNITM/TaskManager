// src/features/tasks/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loadTasks, saveTasks } from '../../services/localStorage';

const initialState = {
  tasks: loadTasks() || [],
  filter: 'all',
  searchQuery: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasks(state.tasks);
      }
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
      saveTasks(state.tasks);
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
} = tasksSlice.actions;

export default tasksSlice.reducer;