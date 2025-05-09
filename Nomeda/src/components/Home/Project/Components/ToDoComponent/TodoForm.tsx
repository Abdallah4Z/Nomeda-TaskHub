import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { Add, Cancel } from '@mui/icons-material';
import { Todo } from './types';

const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health', 'Other'];

interface TodoFormProps {
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  showSnackbar: (message: string, severity?: 'success' | 'error') => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ setTodoList, showSnackbar }) => {
  const [todoText, setTodoText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('Other');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const resetForm = () => {
    setTodoText('');
    setSelectedPriority('low');
    setDueDate(null);
    setCategory('Other');
    setEditingTodo(null);
  };

  const handleAddTodo = () => {
    if (todoText.trim() === '') {
      showSnackbar('Todo text cannot be empty', 'error');
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: todoText,
      completed: false,
      priority: selectedPriority,
      dueDate,
      category,
      createdAt: new Date().toISOString(),
    };

    setTodoList((prevList) => [...prevList, newTodo]);
    resetForm();
    showSnackbar('Todo added successfully');
  };

  const handleUpdateTodo = () => {
    if (editingTodo) {
      setTodoList((prevList) =>
        prevList.map((todo) =>
          todo.id === editingTodo.id
            ? { ...todo, text: todoText, priority: selectedPriority, dueDate, category }
            : todo
        )
      );
      resetForm();
      showSnackbar('Todo updated successfully');
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setTodoText(todo.text);
    setSelectedPriority(todo.priority);
    setDueDate(todo.dueDate);
    setCategory(todo.category);
  };

  return (
    <Box sx={{ mb: 3, p: 2, border: '1px solid', borderRadius: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Add new task"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
        sx={{ mb: 2 }}
      />
      <Grid container spacing={2}>
        <Grid sx={{ width: { xs: '100%', sm: '25%' } }}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as 'low' | 'medium' | 'high')}
              label="Priority"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid sx={{ width: { xs: '100%', sm: '25%' } }}>
          <TextField
            type="date"
            label="Due Date"
            value={dueDate || ''}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid sx={{ width: { xs: '100%', sm: '25%' } }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid sx={{ width: { xs: '100%', sm: '25%' } }}>
          <Button
            onClick={editingTodo ? handleUpdateTodo : handleAddTodo}
            startIcon={<Add />}
            sx={{ height: '100%' }}
          >
            {editingTodo ? 'Update' : 'Add'} Task
          </Button>
        </Grid>
      </Grid>
      {editingTodo && (
        <Button
          variant="outlined"
          onClick={resetForm}
          sx={{ mt: 2 }}
          startIcon={<Cancel />}
        >
          Cancel Edit
        </Button>
      )}
    </Box>
  );
};

export default TodoForm;