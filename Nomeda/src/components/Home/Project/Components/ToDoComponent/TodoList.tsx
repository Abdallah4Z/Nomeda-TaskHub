import React, { useState, useCallback } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { CheckCircle, Delete } from '@mui/icons-material';
import { Todo } from './types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  isViewMode: boolean;
  showSnackbar: (message: string, severity?: 'success' | 'error') => void;
}

const TodoList: React.FC<TodoListProps> = ({ todoList, setTodoList, isViewMode, showSnackbar }) => {
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>('createdAt');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBulkComplete = () => {
    const updatedList = todoList.map((todo) =>
      selectedTodos.includes(todo.id) ? { ...todo, completed: true } : todo
    );
    setTodoList(updatedList);
    setSelectedTodos([]);
    showSnackbar('Selected todos marked as completed');
  };

  const handleBulkDelete = () => {
    const updatedList = todoList.filter((todo) => !selectedTodos.includes(todo.id));
    setTodoList(updatedList);
    setSelectedTodos([]);
    showSnackbar('Selected todos deleted');
  };

  const filteredAndSortedTodos = useCallback(() => {
    let filtered = todoList;

    if (filterStatus !== 'all') {
      filtered = filtered.filter((todo) => 
        filterStatus === 'completed' ? todo.completed : !todo.completed
      );
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter((todo) => todo.priority === filterPriority);
    }

    if (searchQuery) {
      filtered = filtered.filter((todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [todoList, filterStatus, filterPriority, searchQuery, sortBy]);

  return (
    <Stack spacing={2}>
      {!isViewMode && selectedTodos.length > 0 && (
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleBulkComplete}
            startIcon={<CheckCircle />}
          >
            Complete Selected
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleBulkDelete}
            startIcon={<Delete />}
          >
            Delete Selected
          </Button>
        </Box>
      )}

      {!isViewMode && (
        <FormControl sx={{ mb: 2, minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'dueDate' | 'priority' | 'createdAt')}
            label="Sort By"
          >
            <MenuItem value="createdAt">Created Date</MenuItem>
            <MenuItem value="dueDate">Due Date</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
          </Select>
        </FormControl>
      )}

      {filteredAndSortedTodos().map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isViewMode={isViewMode}
          isSelected={selectedTodos.includes(todo.id)}
          onSelect={() => setSelectedTodos((prev) =>
            prev.includes(todo.id) ? prev.filter((id) => id !== todo.id) : [...prev, todo.id]
          )}
          onToggleComplete={() => {
            setTodoList((prev) =>
              prev.map((t) => t.id === todo.id ? { ...t, completed: !t.completed } : t)
            );
            showSnackbar('Todo status updated');
          }}
          onDelete={() => {
            setTodoList((prev) => prev.filter((t) => t.id !== todo.id));
            setSelectedTodos((prev) => prev.filter((id) => id !== todo.id));
            showSnackbar('Todo deleted');
          }}
          onEdit={() => {
            // Handled in TodoForm via context or parent state
          }}
        />
      ))}
    </Stack>
  );
};

export default TodoList;