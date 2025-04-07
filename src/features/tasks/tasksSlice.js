import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filters: {
    status: 'all', // all, completed, incomplete
    category: 'all',
    priority: 'all', // all, high, medium, low
    searchTerm: ''
  },
  categories: ['personal', 'work', 'shopping', 'health']
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items.push({
        id: Date.now(),
        title: action.payload.title,
        category: action.payload.category,
        priority: action.payload.priority,
        dueDate: action.payload.dueDate,
        completed: false,
        order: state.items.length
      });
    },
    removeTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.items.splice(sourceIndex, 1);
      state.items.splice(destinationIndex, 0, removed);
      
      // Update order property for all tasks
      state.items.forEach((task, index) => {
        task.order = index;
      });
    },
    setFilter: (state, action) => {
      state.filters[action.payload.type] = action.payload.value;
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    }
  }
});

export const {
  addTask,
  removeTask,
  toggleTask,
  updateTask,
  reorderTasks,
  setFilter,
  addCategory
} = tasksSlice.actions;

// Selectors
export const selectAllTasks = state => state.tasks.items;
export const selectFilters = state => state.tasks.filters;
export const selectCategories = state => state.tasks.categories;

export const selectFilteredTasks = state => {
  const { items, filters } = state.tasks;
  
  return items
    .filter(task => {
      // Filter by completion status
      if (filters.status === 'completed') return task.completed;
      if (filters.status === 'incomplete') return !task.completed;
      return true;
    })
    .filter(task => {
      // Filter by category
      if (filters.category === 'all') return true;
      return task.category === filters.category;
    })
    .filter(task => {
      // Filter by priority
      if (filters.priority === 'all') return true;
      return task.priority === filters.priority;
    })
    .filter(task => {
      // Filter by search term
      if (!filters.searchTerm) return true;
      return task.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
    })
    .sort((a, b) => a.order - b.order);
};

export default tasksSlice.reducer;