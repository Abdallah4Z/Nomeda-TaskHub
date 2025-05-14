import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import ProjectTitle from './ProjectTitle';
import TaskDialog from './TaskDialog';
import useTasks from '../../../../hooks/useTasks';

interface HeaderProps {
  projectName: string;
  projectDescription?: string;
  onEdit?: (name: string, description?: string) => void;
  onFilterChange?: (e: React.ChangeEvent<{ value: unknown }>) => void;
}

interface NewTaskData {
  title: string;
  description?: string;
  priority: 'High' | 'Normal' | 'Low';
  assignedAt?: string;
  users: Array<{ name: string; avatar: string; }>;
}

const Header: React.FC<HeaderProps> = ({
  projectName = "New Project",
  projectDescription = "",
  onEdit
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState(projectName);
  const [editDescription, setEditDescription] = useState(projectDescription);
  
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const { tasks, addTask } = useTasks();
  const users = tasks?.length > 0 ? tasks[0]?.users || [] : [];

  const handleEditClick = () => {
    setEditName(projectName);
    setEditDescription(projectDescription);
    setEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (editName.trim()) {
      onEdit?.(editName, editDescription);
      setEditDialogOpen(false);
    }
  };

 

  const handleAddTask = async (task: NewTaskData) => {
    try {
      if (!task.title) {
        throw new Error('Task title is required');
      }        const newTask = {
        title: task.title,
        description: task.description || '',
        status: 'todo' as const,
        priority: task.priority,
        dueDate: task.assignedAt || undefined, // Ensure dueDate is always sent to backend
        assignedAt: task.assignedAt || undefined, // Keep assignedAt for UI consistency
        assignees: task.users.map(u => u.name),
        labels: [] as string[]
      };

      await addTask(newTask);
      setTaskDialogOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', mt: 5, justifyContent: 'center', alignItems: 'center', ml: '2vw' }}>
      <Box sx={{ borderRadius: '8px', p: 2, flexShrink: 0, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <ProjectTitle projectName={projectName} onEdit={handleEditClick} />
          {projectDescription && (
            <Box sx={{ mt: 1, color: '#666', fontSize: '0.9rem', textAlign: 'center' }}>
              {projectDescription}
            </Box>
          )}
        </Box>
      </Box>
      
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Project Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveChanges} variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
      
      <TaskDialog
        open={taskDialogOpen}
        onClose={() => setTaskDialogOpen(false)}
        onAddTask={handleAddTask}
      />
    </Box>
  );
};

export default Header;