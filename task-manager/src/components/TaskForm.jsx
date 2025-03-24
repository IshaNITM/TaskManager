// src/components/TaskForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, addCategory } from '../features/tasks/tasksSlice';
import { selectCategories } from '../features/tasks/tasksSlice';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const TaskForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [task, setTask] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
  });
  const [newCategory, setNewCategory] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    dispatch(addTask(task));
    setTask({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
    });
    onClose();
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory));
      setTask(prev => ({ ...prev, category: newCategory }));
      setNewCategory('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Task</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Title*"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
              margin="normal"
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={task.description}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Autocomplete
              freeSolo
              options={categories}
              value={task.category}
              onChange={(_, newValue) => setTask(prev => ({ ...prev, category: newValue }))}
              inputValue={newCategory}
              onInputChange={(_, newInputValue) => setNewCategory(newInputValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  margin="normal"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} />
                ))
              }
            />
            {newCategory && !categories.includes(newCategory) && (
              <Button
                size="small"
                onClick={handleAddCategory}
                sx={{ mt: 1 }}
              >
                Add "{newCategory}" as new category
              </Button>
            )}
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={task.priority}
                label="Priority"
                onChange={handleChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;