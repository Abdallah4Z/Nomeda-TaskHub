import React from 'react';
import { Box, Checkbox, Typography, IconButton, Chip } from '@mui/material';
import { Cancel, CheckCircle, Edit, Delete } from '@mui/icons-material';
import { format, isPast } from 'date-fns';
import { Todo } from './types';

interface TodoItemProps {
  todo: Todo;
  isViewMode: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onToggleComplete: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isViewMode,
  isSelected,
  onSelect,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid',
        borderRadius: 2,
        backgroundColor: isSelected ? '#e3f2fd' : todo.completed ? '#f5f5f5' : 'white',
        borderColor: todo.dueDate && isPast(new Date(todo.dueDate)) && !todo.completed ? 'error.main' : 'grey.300',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {!isViewMode && (
          <Checkbox
            checked={isSelected}
            onChange={onSelect}
          />
        )}
        <Checkbox
          checked={todo.completed}
          onChange={onToggleComplete}
          icon={<Cancel />}
          checkedIcon={<CheckCircle />}
        />
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'text.secondary' : 'text.primary',
            }}
          >
            {todo.text}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip
              label={todo.priority}
              size="small"
              color={
                todo.priority === 'high' ? 'error' :
                todo.priority === 'medium' ? 'warning' : 'success'
              }
            />
            <Chip label={todo.category} size="small" variant="outlined" />
            {todo.dueDate && (
              <Chip
                label={format(new Date(todo.dueDate), 'MM/dd/yyyy')}
                size="small"
                color={isPast(new Date(todo.dueDate)) && !todo.completed ? 'error' : 'default'}
              />
            )}
          </Box>
        </Box>
        {!isViewMode && (
          <Box>
            <IconButton onClick={onEdit}>
              <Edit />
            </IconButton>
            <IconButton onClick={onDelete} color="error">
              <Delete />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TodoItem;