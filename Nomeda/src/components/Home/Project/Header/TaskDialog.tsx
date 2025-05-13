// components/TaskDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateTaskForm from './CreateTaskForm';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onAddTask: (task: {
    title: string;
    description?: string;
    priority: 'High' | 'Normal' | 'Low';
    assignedAt?: string;
    users: Array<{ name: string; avatar: string; }>
  }) => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ open, onClose, onAddTask }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #eee',
        }}
      >
        <Box component="div">
          <Typography variant="h6" fontWeight={600} component="span">Create New Task</Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <CreateTaskForm onAddTask={(task) => {
          onAddTask(task);
          onClose();
        }} />
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
