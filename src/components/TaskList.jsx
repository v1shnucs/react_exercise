import React from 'react';
import { useSelector } from 'react-redux';
import { List, Paper, Typography, Box } from '@mui/material';
import TaskItem from './TaskItem';
import { selectFilteredTasks } from '../features/tasks/tasksSlice';

function TaskList() {
  const tasks = useSelector(selectFilteredTasks);

  if (tasks.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: 1
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No tasks found
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ borderRadius: 1, boxShadow: 1 }}>
      <List sx={{ p: 0 }}>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
          />
        ))}
      </List>
    </Paper>
  );
}

export default TaskList;