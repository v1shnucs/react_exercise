import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack
} from '@mui/material';
import { addTask, selectCategories } from '../features/tasks/tasksSlice';

const PRIORITY_LEVELS = ['low', 'medium', 'high'];

function TaskForm() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTask({
      title: title.trim(),
      category,
      priority,
      dueDate
    }));

    // Reset form
    setTitle('');
    setCategory('personal');
    setPriority('medium');
    setDueDate(null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 1
      }}
    >
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              {PRIORITY_LEVELS.map(level => (
                <MenuItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ minWidth: 200 }}>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              placeholderText="Select due date"
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
              customInput={
                <TextField
                  fullWidth
                  label="Due Date"
                />
              }
            />
          </Box>
        </Stack>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Add Task
        </Button>
      </Stack>
    </Box>
  );
}

export default TaskForm;