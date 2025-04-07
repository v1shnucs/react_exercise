import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { format, isAfter, addDays } from 'date-fns';
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import {
  Delete as DeleteIcon,
  DateRange as DateIcon
} from '@mui/icons-material';
import { removeTask, toggleTask, reorderTasks } from '../features/tasks/tasksSlice';

const PRIORITY_COLORS = {
  high: '#f44336',
  medium: '#ff9800',
  low: '#4caf50'
};

function TaskItem({ task, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        dispatch(reorderTasks({
          sourceIndex: draggedItem.index,
          destinationIndex: index
        }));
        draggedItem.index = index;
      }
    }
  });

  drag(drop(ref));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const taskDate = new Date(task.dueDate);
  taskDate.setHours(0, 0, 0, 0);
  
  const isApproachingDueDate = task.dueDate &&
    (taskDate.getTime() <= addDays(today, 2).getTime() && taskDate.getTime() >= today.getTime());

  return (
    <ListItem
      ref={ref}
      className={`task-item ${isDragging ? 'dragging' : ''} ${isApproachingDueDate ? 'date-approaching' : ''}`}
      sx={{
        mb: 1,
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 1,
        opacity: isDragging ? 0.5 : 1,
        '&:hover': {
          backgroundColor: '#f5f5f5'
        }
      }}
    >
      <Checkbox
        checked={task.completed}
        onChange={() => dispatch(toggleTask(task.id))}
        color="primary"
      />
      
      <ListItemText
        primary={
          <Typography
            sx={{
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'text.disabled' : 'text.primary'
            }}
          >
            {task.title}
          </Typography>
        }
        secondary={
          <Stack direction="row" spacing={1} mt={1}>
            <Chip
              label={task.category}
              size="small"
              sx={{ bgcolor: '#e0e0e0' }}
            />
            <Chip
              label={task.priority}
              size="small"
              sx={{
                bgcolor: PRIORITY_COLORS[task.priority],
                color: 'white'
              }}
            />
            {task.dueDate && (
              <Chip
                icon={<DateIcon />}
                label={format(new Date(task.dueDate), 'MMM d, yyyy')}
                size="small"
                color={isApproachingDueDate ? "error" : "default"}
                variant={isApproachingDueDate ? "filled" : "outlined"}
              />
            )}
          </Stack>
        }
      />

      <IconButton
        edge="end"
        onClick={() => dispatch(removeTask(task.id))}
        color="error"
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

export default TaskItem;