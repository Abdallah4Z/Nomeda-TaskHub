import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Typography, Chip, IconButton, MenuItem, InputLabel, FormControl, Select } from '@mui/material';
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

    if (!title || userNames.length === 0 || !assignedAt) return;
    
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
        <TextField
          label="Task Title"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            label="Assignee Name"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            fullWidth
          />
          <IconButton color="primary" onClick={handleAddUser}>
            <AddIcon />
          </IconButton>
        </Stack>

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
        )}

        <TextField
          label="Assigned At"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          value={assignedAt}
          onChange={(e) => setAssignedAt(e.target.value)}
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
