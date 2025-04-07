import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <Box
          sx={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <TaskForm />
          <FilterBar />
          <TaskList />
        </Box>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;