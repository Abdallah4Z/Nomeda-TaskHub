import React, { useState } from 'react';
import useTasks from '../../../../hooks/useTasks';
import { projectService } from '../../../../services/projectService';
import LoadingSpinner from '../../../Common/LoadingSpinner';
import ListHeader from './ListHeader';
import ListCard from './ListCard';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FormattedTask } from '../../../../types/project';

interface ListViewProps {
  projectId: string;
  refreshProject?: () => Promise<void>;
}

const ListView: React.FC<ListViewProps> = ({ projectId, refreshProject }) => {
  const { tasks, loading, error, addTask, refreshTasks } = useTasks(projectId);
  const [openNewTaskDialog, setOpenNewTaskDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'Normal' as 'High' | 'Normal' | 'Low',
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleOpenNewTask = () => {
    setOpenNewTaskDialog(true);
    setSubmitError(null);
  };

  const handleCloseNewTask = () => {
    setOpenNewTaskDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewTask = async () => {
    if (!newTask.title.trim()) {
      setSubmitError('Title is required');
      return;
    }

    try {
      await addTask({
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        priority: newTask.priority
      });
      
      // Reset form and close dialog
      setNewTask({
        title: '',
        description: '',
        status: 'todo',
        priority: 'Normal'
      });
      setOpenNewTaskDialog(false);
      
      // Refresh the project data if needed
      if (refreshProject) {
        await refreshProject();
      }
    } catch (err) {
      setSubmitError('Failed to create task');
    }
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ alignItems: 'center', mb: 2, mt:1}}>
        <ListHeader />
      </Box>
        <Box sx={{ overflowY: 'auto' }}>
        {tasks && tasks.length > 0 ? (
          tasks.map((task: FormattedTask) => (
            <ListCard 
              key={task.id} 
              task={task} 
              onEdit={async (updatedTask) => {
                try {
                  await projectService.updateTask(projectId, task.id, updatedTask);
                  refreshTasks();
                } catch (err) {
                  console.error("Failed to update task:", err);
                }
              }}
              onDelete={async (taskId) => {
                try {
                  await projectService.deleteTask(projectId, taskId);
                  refreshTasks();
                } catch (err) {
                  console.error("Failed to delete task:", err);
                }
              }}
            />
          ))
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            No tasks found. Create your first task!
          </Box>
        )}
      </Box>

      {/* New Task Dialog */}
      <Dialog open={openNewTaskDialog} onClose={handleCloseNewTask}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
          
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Task Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newTask.title}
            onChange={handleInputChange}
          />
          
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={newTask.description}
            onChange={handleInputChange}
          />
          
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={newTask.status}
                label="Status"
                onChange={handleSelectChange}
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="review">Review</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={newTask.priority}
                label="Priority"
                onChange={handleSelectChange}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewTask}>Cancel</Button>
          <Button onClick={handleSubmitNewTask} variant="contained">Create Task</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListView;