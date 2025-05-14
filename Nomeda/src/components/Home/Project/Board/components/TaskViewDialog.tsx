import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Chip,
  Button,
  Avatar
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { TaskViewDialogProps } from './types';

const TaskViewDialog: React.FC<TaskViewDialogProps> = ({
  isOpen,
  onClose,
  task,
  onEdit,
  onDelete,
  onUpdateStatus,
  getColorByLabel
}) => {
  if (!task) return null;

  // Get display name for status
  const getStatusDisplayName = (status: string | undefined) => {
    switch (status) {
      case 'todo': return 'To Do';
      case 'in-progress': return 'In Progress';
      case 'review': return 'Review';
      case 'done': return 'Done';
      default: return 'To Do';
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Task Details</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <Typography variant="h5" gutterBottom>{task.title}</Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '100px' }}>
              Priority:
            </Typography>
            <Chip 
              label={task.priority} 
              color={
                task.priority === 'High' ? 'error' : 
                task.priority === 'Low' ? 'success' : 'warning'
              }
              size="small"
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '100px' }}>
              Status:
            </Typography>
            <Chip 
              label={getStatusDisplayName(task.status)}
              color={getColorByLabel(getStatusDisplayName(task.status))}
              size="small"
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '100px' }}>
              Deadline:
            </Typography>
            <Typography variant="body1">
              {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline set'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '100px' }}>
              Assigned:
            </Typography>
            <Typography variant="body1">{task.assignedAt}</Typography>
          </Box>

          <Box sx={{ my: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Assignees:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {task.users.map((user, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <Avatar src={user.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                  <Typography variant="body2">{user.name}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Change Status:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Button 
                variant={task.status === 'todo' ? 'contained' : 'outlined'} 
                color="warning"
                size="small"
                onClick={() => onUpdateStatus(task.id, 'todo')}
                disabled={task.status === 'todo'}
              >
                To Do
              </Button>
              <Button 
                variant={task.status === 'in-progress' ? 'contained' : 'outlined'} 
                color="info"
                size="small"
                onClick={() => onUpdateStatus(task.id, 'in-progress')}
                disabled={task.status === 'in-progress'}
              >
                In Progress
              </Button>
              <Button 
                variant={task.status === 'review' ? 'contained' : 'outlined'} 
                color="secondary"
                size="small"
                onClick={() => onUpdateStatus(task.id, 'review')}
                disabled={task.status === 'review'}
              >
                Review
              </Button>
              <Button 
                variant={task.status === 'done' ? 'contained' : 'outlined'} 
                color="success"
                size="small"
                onClick={() => onUpdateStatus(task.id, 'done')}
                disabled={task.status === 'done'}
              >
                Done
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={() => onEdit(task)} 
          startIcon={<Edit />}
        >
          Edit
        </Button>
        <Button 
          onClick={() => onDelete(task.id)}
          color="error"
          startIcon={<Delete />}
        >
          Delete
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskViewDialog;
