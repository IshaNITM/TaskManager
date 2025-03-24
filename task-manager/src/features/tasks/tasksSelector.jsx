export const selectFilteredTasks = (state) => {
    const { tasks, filter, searchQuery } = state.tasks.present;
    
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
  
  export const selectCategories = (state) => state.tasks.present.categories;