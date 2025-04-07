import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack
} from '@mui/material';
import {
  setFilter,
  selectFilters,
  selectCategories
} from '../features/tasks/tasksSlice';

const PRIORITY_LEVELS = ['all', 'high', 'medium', 'low'];
const STATUS_OPTIONS = [
  { value: 'all', label: 'All Tasks' },
  { value: 'completed', label: 'Completed' },
  { value: 'incomplete', label: 'Incomplete' }
];

function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const categories = useSelector(selectCategories);

  const handleFilterChange = (type, value) => {
    dispatch(setFilter({ type, value }));
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 1
      }}
    >
      <Stack direction="row" spacing={2}>
        <TextField
          label="Search Tasks"
          variant="outlined"
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          sx={{ minWidth: 200 }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            label="Status"
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            {STATUS_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category}
            label="Category"
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={filters.priority}
            label="Priority"
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            {PRIORITY_LEVELS.map(level => (
              <MenuItem key={level} value={level}>
                {level === 'all' ? 'All Priorities' : 
                  level.charAt(0).toUpperCase() + level.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
}

export default FilterBar;