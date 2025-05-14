import React, { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Alert,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TaskDialogProps, TaskFormData } from './types';

const TaskDialog: React.FC<TaskDialogProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  task, 
  availableAssignees, 
  onSubmit,
  boardStatus,
  isSubmitting 
}) => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    priority: 'Normal',
    assignees: [],
    deadline: new Date(),
    status: boardStatus,
  });

  // Initialize form data when editing a task
  useEffect(() => {
    if (mode === 'edit' && task) {
      setFormData({
        title: task.title,
        priority: task.priority,
        assignees: task.assignees || [],
        deadline: task.deadline || new Date(),
        status: (task.status as 'todo' | 'in-progress' | 'review' | 'done') || boardStatus,
      });
    } else if (mode === 'add') {
      // Reset form for add mode
      setFormData({
        title: '',
        priority: 'Normal',
        assignees: [],
        deadline: new Date(),
        status: boardStatus,
      });
    }
  }, [mode, task, boardStatus]);

  const handleSubmit = async () => {
    // Validate the form data first
    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }
    
    if (formData.assignees.length === 0) {
      setError('Please assign the task to at least one person');
      return;
    }

    // Clear previous errors
    setError(null);
    
    // Submit the form data
    await onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{mode === 'add' ? 'Add New Task' : 'Edit Task'}</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            autoFocus
            label="Task Title"
            fullWidth
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={formData.priority}
              label="Priority"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value as 'High' | 'Normal' | 'Low',
                })
              }
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Assignees</InputLabel>
            <Select
              multiple
              value={formData.assignees}
              label="Assignees"
              onChange={(e) => {
                const value = e.target.value as string[];
                setFormData({ ...formData, assignees: value });
              }}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => {
                    const assignee = availableAssignees.find(a => a.name === value);
                    return assignee ? (
                      <Box key={value} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Avatar src={assignee.avatar} sx={{ width: 24, height: 24 }} />
                        <span>{value}</span>
                      </Box>
                    ) : null;
                  })}
                </Box>
              )}
            >
              {availableAssignees.map((assignee) => (
                <MenuItem key={assignee.name} value={assignee.name}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar src={assignee.avatar} sx={{ width: 24, height: 24 }} />
                    <span>{assignee.name}</span>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Deadline"
              value={formData.deadline}
              onChange={(newValue) => setFormData({ ...formData, deadline: newValue })}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : mode === 'add' ? (
            'Add Task'
          ) : (
            'Save Changes'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
