import { configureStore } from '@reduxjs/toolkit';
import undoable from 'redux-undo';
import tasksReducer from '../features/tasks/tasksSlice';

// Create a basic reducer without undo first
const rootReducer = {
  tasks: tasksReducer
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});