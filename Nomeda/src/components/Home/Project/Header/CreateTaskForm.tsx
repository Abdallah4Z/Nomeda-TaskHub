import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Typography, Chip, IconButton, MenuItem, InputLabel, FormControl, Select, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Close';

interface User {
  name: string;
  avatar: string;
}

interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface Task {
  id?: string;
  title: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'High' | 'Normal' | 'Low';
  dueDate?: string; // This matches what backend expects
  assignedAt?: string; // For UI consistency
  assignees?: string[];
  labels?: string[];
  users: User[];
  actions?: Action[];
}

interface Props {
  onAddTask: (task: Task) => void;
  taskToEdit?: Task; // New prop for editing
  onUpdateTask?: (task: Task) => void; // Prop to handle task updates
}

const CreateTaskForm: React.FC<Props> = ({ onAddTask, taskToEdit, onUpdateTask }) => {
  const [title, setTitle] = useState('');
  const [userNames, setUserNames] = useState<string[]>([]);
  const [newUser, setNewUser] = useState('');
  const [assignedAt, setAssignedAt] = useState('');
  const [priority, setPriority] = useState<'High' | 'Normal' | 'Low'>('Normal');
  const [errors, setErrors] = useState<{
    title?: string;
    users?: string;
    assignedAt?: string;
  }>({});

  // Populate form with existing task data when editing
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setUserNames(taskToEdit.users.map((user) => user.name));
      setAssignedAt(taskToEdit.dueDate || taskToEdit.assignedAt || ''); // Use dueDate or fallback to assignedAt
      setPriority(taskToEdit.priority);
    }
  }, [taskToEdit]);

  const getRandomAvatar = (name: string) =>
    `https://robohash.org/${name}?set=set5&size=200x200`;

  const handleAddUser = () => {
    const trimmed = newUser.trim();
    if (trimmed && !userNames.includes(trimmed)) {
      setUserNames((prev) => [...prev, trimmed]);
      setNewUser('');
    }
  };

  const handleRemoveUser = (name: string) => {
    setUserNames((prev) => prev.filter((user) => user !== name));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate form fields
    const newErrors: {title?: string; users?: string; assignedAt?: string} = {};
    
    if (!title.trim()) {
      newErrors.title = "Task title is required";
    }
    
    if (userNames.length === 0) {
      newErrors.users = "At least one assignee is required";
    }
    
    if (!assignedAt) {
      newErrors.assignedAt = "Assigned date is required";
    }
    
    // If there are errors, show them and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const newTask: Task = {
      id: taskToEdit ? taskToEdit.id : Date.now().toString(),
      title,
      description: "",
      status: 'todo',
      priority,
      dueDate: assignedAt, // Set dueDate field for backend
      assignedAt,          // Keep assignedAt for UI consistency
      assignees: userNames,
      labels: [],
      users: userNames.map((name) => ({
        name,
        avatar: getRandomAvatar(name),
      })),
      actions: [
        { label: 'Edit', onClick: () => console.log('Edit Task') },
        { label: 'Delete', onClick: () => console.log('Delete Task') },
      ],
    };

    if (taskToEdit) {
      onUpdateTask?.(newTask);
    } else {
      onAddTask(newTask);
    }

    // Reset form after submission
    setTitle('');
    setUserNames([]);
    setAssignedAt('');
    setPriority('Normal');
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {Object.keys(errors).length > 0 && 
          <Stack spacing={1} sx={{mb: 2}}>
            {Object.entries(errors).map(([key, value]) => (
              <Typography key={key} color="error" variant="body2">{value}</Typography>
            ))}
          </Stack>
        }
        <TextField
          label="Task Title"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
        />        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            label="Assignee Name"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            fullWidth
            error={!!errors.users && userNames.length === 0}
          />
          <IconButton color="primary" onClick={handleAddUser}>
            <AddIcon />
          </IconButton>
        </Stack>
        {errors.users && userNames.length === 0 && (
          <Typography color="error" variant="caption">{errors.users}</Typography>
        )}

        {userNames.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {userNames.map((name) => (
              <Chip
                key={name}
                label={name}
                onDelete={() => handleRemoveUser(name)}
                deleteIcon={<DeleteIcon />}
              />
            ))}
          </Stack>
        )}        <TextField
          label="Assigned At"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          value={assignedAt}
          onChange={(e) => setAssignedAt(e.target.value)}
          error={!!errors.assignedAt}
          helperText={errors.assignedAt}
        />

        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            label="Priority"
            onChange={(e) =>
              setPriority(e.target.value as 'High' | 'Normal' | 'Low')
            }
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" type="submit">
          {taskToEdit ? 'Update Task' : 'Create Task'}
        </Button>
      </Stack>
    </form>
  );
};

export default CreateTaskForm;
