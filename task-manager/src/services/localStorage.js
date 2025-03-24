// src/services/localStorage.js
export const loadTasks = () => {
    try {
      const serializedTasks = localStorage.getItem('tasks');
      if (serializedTasks === null) {
        return undefined;
      }
      return JSON.parse(serializedTasks);
    } catch (err) {
      console.error('Error loading tasks from localStorage:', err);
      return undefined;
    }
  };
  
  export const saveTasks = (tasks) => {
    try {
      const serializedTasks = JSON.stringify(tasks);
      localStorage.setItem('tasks', serializedTasks);
    } catch (err) {
      console.error('Error saving tasks to localStorage:', err);
    }
  };