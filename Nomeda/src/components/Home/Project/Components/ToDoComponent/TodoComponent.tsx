import React, { useState, useEffect, Component, ComponentType } from 'react';
import { Box, LinearProgress, Snackbar, Alert, Typography } from '@mui/material';
import { Todo, DropdownMenuItem } from './types';
import TodoToolbar from './TodoToolbar';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilters from './TodoFilters';
import { loadTodos, saveTodos } from './utils';

// Error Boundary Component
class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Typography color="error">Something went wrong with the Todo Component.</Typography>;
    }
    return this.props.children;
  }
}

const STORAGE_VERSION = '1.0';

interface TodoComponentProps {
  id: number;
  dropdownMenuItems?: DropdownMenuItem[];
  onDeleteComponent: () => void;
  onEdit?: () => void;
}

const TodoComponent: React.FC<TodoComponentProps> = ({ id, dropdownMenuItems = [], onDeleteComponent }) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Load todos from localStorage with component-specific key
  useEffect(() => {
    setTodoList(loadTodos(STORAGE_VERSION, `todos_${id}`));
  }, [id]);

  // Save todos to localStorage
  useEffect(() => {
    saveTodos(todoList, STORAGE_VERSION, `todos_${id}`);
  }, [todoList, id]);

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleDeleteAll = () => {
    setTodoList([]);
    localStorage.removeItem(`todos_${id}`);
    showSnackbar('All todos deleted');
  };

  const completionPercentage = todoList.length
    ? (todoList.filter((todo) => todo.completed).length / todoList.length) * 100
    : 0;

  return (
    <ErrorBoundary>
      <Box>
        <TodoToolbar
          isFullscreen={isFullscreen}
          isViewMode={isViewMode}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          onSave={() => {
            setIsViewMode(true);
            showSnackbar('Todo list saved');
          }}
          onDeleteAll={handleDeleteAll}
          onEditMode={() => setIsViewMode(false)}
          onDeleteComponent={onDeleteComponent}
          dropdownMenuItems={dropdownMenuItems}
        />

        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>
              Completion Progress ({completionPercentage.toFixed(0)}%)
            </Typography>
            <LinearProgress variant="determinate" value={completionPercentage} />
          </Box>

          {!isViewMode && (
            <>
              <TodoFilters />
              <TodoForm setTodoList={setTodoList} showSnackbar={showSnackbar} />
            </>
          )}

          <TodoList
            todoList={todoList}
            setTodoList={setTodoList}
            isViewMode={isViewMode}
            showSnackbar={showSnackbar}
          />

          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          >
            <Alert
              severity={snackbar.severity}
              onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default TodoComponent;