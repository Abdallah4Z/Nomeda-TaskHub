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
  onAddTask: (task: any) => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ open, onClose, onAddTask }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #eee',
        }}
      >
        <Typography variant="h6" fontWeight={600}>Create New Task</Typography>
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
