import React, { useEffect, useState } from 'react';
import SettingsMenu from '../../../Common/SettingsMenu';
import TaskCard from '../../../Tasks/TaskCard';
import { FormattedTask } from '../../../../types/project';
import '../../../../style/board.css';
import { Add, Delete, Edit, LabelImportant } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {
  Chip,
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
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useTasks from '../../../../hooks/useTasks';
import { useParams } from 'react-router-dom';
import { projectService } from '../../../../services/projectService';

interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface Task {
  id: string;
  title: string;
  users: { name: string; avatar: string }[];
  assignedAt: string;
  priority: 'High' | 'Normal' | 'Low';
  deadline?: Date;
  status?: string;
  assignees?: string[];
  description?: string;
}

const Board: React.FC<{ label: string, tasks: FormattedTask[] }> = ({ label, tasks = [] }) => {  const { id: routeProjectId } = useParams<{ id: string }>();
  const projectId = routeProjectId || (window.location.pathname.split('/projects/')[1] || '').split('/')[0];
  
  const { addTask, refreshTasks } = useTasks(projectId);
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', severity: 'success' as 'success' | 'error' });
  const [isBoardLoading, setIsBoardLoading] = useState(false);
  
  // Get status from label
  const getBoardStatus = (): 'todo' | 'in-progress' | 'review' | 'done' => {
    const labelLower = label.toLowerCase();
    if (labelLower === 'to do') return 'todo';
    if (labelLower === 'in progress') return 'in-progress';
    if (labelLower === 'review') return 'review';
    if (labelLower === 'done') return 'done';
    return 'todo'; // Default
  };
  
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'Normal' as 'High' | 'Normal' | 'Low',
    assignees: [] as string[],
    deadline: new Date() as Date | null,
    status: getBoardStatus(),
  });

  // Update local tasks when props tasks change
  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      // Convert FormattedTask to the Board Task interface
      const convertedTasks = tasks.map(task => ({
        id: task.id,
        title: task.title,
        users: task.users || [],
        assignedAt: task.assignedAt || '',
        priority: task.priority || 'Normal',
        status: task.status,
        deadline: task.dueDate ? new Date(String(task.dueDate)) : undefined
      }));
      setLocalTasks(convertedTasks);
    }
  }, [tasks]);

  // Available assignees (you can expand this list)
  const availableAssignees = [
    { name: 'John Doe', avatar: `https://robohash.org/john?set=set5` },
    { name: 'Jane Smith', avatar: `https://robohash.org/jane?set=set5` },
    { name: 'Mike Johnson', avatar: `https://robohash.org/mike?set=set5` },
  ];

  const handleOpenAddDialog = () => {
    setIsAddTaskDialogOpen(true);
  };
  
  const handleCloseAddDialog = () => {
    setIsAddTaskDialogOpen(false);
    setNewTask({
      title: '',
      priority: 'Normal',
      assignees: [],
      deadline: new Date(),
      status: getBoardStatus(),
    });
    setError(null);
  };
  
  const handleFeedbackClose = () => {
    setShowFeedback(false);
  };
  
  const handleOpenEditDialog = (task: Task) => {
    setSelectedTask(task);
    setNewTask({
      title: task.title,
      priority: task.priority,
      assignees: task.assignees || [],
      deadline: task.deadline || new Date(),
      status: (task.status as 'todo' | 'in-progress' | 'review' | 'done') || getBoardStatus(),
    });
    setIsEditTaskDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditTaskDialogOpen(false);
    setSelectedTask(null);
  };  // All task handling logic has been moved to the TaskDialog component's handleSubmit function  // Handler for deleting all tasks in the current board
  const handleDeleteBoard = async () => {
    // Show confirmation dialog before proceeding
    const confirmDelete = window.confirm(`Are you sure you want to delete all tasks in the "${label}" board?`);
    if (!confirmDelete) return;

    setIsSubmitting(true);
    setIsBoardLoading(true);
    setError(null);

    try {
      // Get tasks with the current board status
      const tasksToDelete = localTasks.filter(task => 
        task.status === getBoardStatus() || 
        (!task.status && getBoardStatus() === 'todo') // Handle legacy tasks with no status
      );
        if (tasksToDelete.length === 0) {
        setFeedback({
          message: 'No tasks to delete',
          severity: 'success'
        });
        setShowFeedback(true);
        setIsSubmitting(false);
        return;
      }
      
      // Delete each task individually
      const deletePromises = tasksToDelete.map(task => 
        projectService.deleteTask(projectId, task.id)
      );
      
      await Promise.all(deletePromises);
      
      // Update UI to remove deleted tasks
      setLocalTasks(localTasks.filter(task => 
        task.status !== getBoardStatus() && 
        !(task.status === undefined && getBoardStatus() === 'todo')
      ));
      
      setFeedback({
        message: `Successfully deleted all tasks in "${label}" board`,
        severity: 'success'
      });
      setShowFeedback(true);
      
      // Refresh tasks from backend to ensure we have the latest data      refreshTasks();
    } catch (err) {
      console.error('Error deleting tasks:', err);
      setError('Failed to delete tasks. Please try again.');
      setFeedback({
        message: 'Failed to delete tasks',
        severity: 'error'
      });
      setShowFeedback(true);
    } finally {
      setIsSubmitting(false);
      setIsBoardLoading(false);
    }
  };  // Handler for deleting a single task
  const handleDeleteTask = async (taskId: string) => {
    // Confirm before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;
    
    setIsBoardLoading(true);
    try {
      await projectService.deleteTask(projectId, taskId);
      setLocalTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      
      setFeedback({
        message: 'Task deleted successfully',
        severity: 'success'
      });
      setShowFeedback(true);
      
      // Refresh tasks from backend to ensure we have the latest data
      refreshTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      setFeedback({
        message: 'Failed to delete task',
        severity: 'error'
      });
      setShowFeedback(true);
    } finally {
      setIsBoardLoading(false);
    }
  };
  // Static actions for the board header
  const boardActions: Action[] = [
    {
      label: 'Add',
      icon: <Add sx={{ fontSize: 18 }} />,
      onClick: handleOpenAddDialog,
    },
    {
      label: `Delete All (${localTasks.filter(task => 
        task.status === getBoardStatus() || 
        (!task.status && getBoardStatus() === 'todo')
      ).length})`,
      icon: <Delete sx={{ fontSize: 18 }} />,
      onClick: handleDeleteBoard,
    },
  ];

  const getColorByLabel = (label: string) => {
    switch (label.toLowerCase()) {
      case 'to do':
        return 'warning';
      case 'in progress':
        return 'info';
      case 'done':
        return 'success';
      case 'blocked':
        return 'error';
      case 'maniak':
        return 'secondary';
      case 'ahmed':
        return 'primary';
      default:
        return 'default';
    }
  };

  const TaskDialog = ({ isOpen, onClose, mode }: { isOpen: boolean; onClose: () => void; mode: 'add' | 'edit' }) => {
    const [formData, setFormData] = useState({
      title: mode === 'edit' && newTask ? newTask.title : '',
      priority: mode === 'edit' && newTask ? newTask.priority : 'Normal' as 'High' | 'Normal' | 'Low',
      assignees: mode === 'edit' && newTask ? newTask.assignees || [] : [] as string[],
      deadline: mode === 'edit' && newTask ? newTask.deadline : new Date(),
      status: mode === 'edit' && newTask ? (newTask.status as 'todo' | 'in-progress' | 'review' | 'done') || getBoardStatus() : getBoardStatus(),
    });
    
    // Update form data when editing a different task
    useEffect(() => {
      if (mode === 'edit') {
        setFormData({
          title: newTask.title,
          priority: newTask.priority,
          assignees: newTask.assignees || [],
          deadline: newTask.deadline || new Date(),
          status: (newTask.status as 'todo' | 'in-progress' | 'review' | 'done') || getBoardStatus(),
        });
      }
    }, [mode]);    const handleSubmit = async () => {
      // Validate the form data first
      if (!formData.title.trim()) {
        setError('Task title is required');
        return;
      }
      
      if (formData.assignees.length === 0) {
        setError('Please assign the task to at least one person');
        return;
      }
      
      // For "add" mode
      if (mode === 'add') {
        setIsSubmitting(true);
        setError(null);
        
        try {
          // Prepare task data from formData directly
          const taskData = {
            title: formData.title,
            description: '',
            status: formData.status,
            priority: formData.priority,
            dueDate: formData.deadline || undefined,
            assignees: formData.assignees || []
          };
          
          // Call the API to add the task
          const success = await addTask(taskData);
          
          if (success) {
            // Create local task for immediate feedback
            const assigneesData = formData.assignees
              .map(name => availableAssignees.find(a => a.name === name))
              .filter(Boolean);
            
            const task: Task = {
              id: Date.now().toString(),
              title: formData.title,
              users: assigneesData as { name: string; avatar: string }[],
              assignedAt: new Date().toLocaleDateString(),
              priority: formData.priority,
              deadline: formData.deadline || undefined,
              assignees: formData.assignees || [],
              status: formData.status
            };
            
            setLocalTasks(prevTasks => [...prevTasks, task]);
            setFeedback({ 
              message: 'Task added successfully!', 
              severity: 'success' 
            });
            setShowFeedback(true);
            onClose(); // Close the dialog
          } else {
            throw new Error('Failed to add task');
          }
        } catch (err) {
          console.error('Error adding task:', err);
          setError('Failed to add task. Please try again.');
          setFeedback({ 
            message: 'Failed to add task', 
            severity: 'error' 
          });
          setShowFeedback(true);
        } finally {
          setIsSubmitting(false);
        }      } else if (mode === 'edit') {
        // For edit mode, handle it directly
        if (selectedTask) {
          setIsSubmitting(true);
          setError(null);
          
          try {
            // Apply the form changes directly
            const assigneesData = formData.assignees
              .map(name => availableAssignees.find(a => a.name === name))
              .filter(Boolean);
            
            const updatedTask: Task = {
              ...selectedTask,
              title: formData.title,
              users: assigneesData as { name: string; avatar: string }[],
              priority: formData.priority,
              deadline: formData.deadline || undefined,
              assignees: formData.assignees,
              status: formData.status
            };
            
            setLocalTasks(prevTasks => 
              prevTasks.map(task => task.id === selectedTask.id ? updatedTask : task)
            );
            
            setFeedback({
              message: 'Task updated successfully!',
              severity: 'success'
            });
            setShowFeedback(true);
            onClose(); // Close the dialog
          } catch (err) {
            console.error('Error updating task:', err);
            setError('Failed to update task. Please try again.');
            setFeedback({
              message: 'Failed to update task',
              severity: 'error'
            });
            setShowFeedback(true);
          } finally {
            setIsSubmitting(false);
          }
        }
      }    };

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
  return (
    <div className="board" style={{ position: 'relative' }}>
      {/* Loading Overlay */}
      {isBoardLoading && (
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10
        }}>
          <CircularProgress />
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>Deleting tasks...</span>
        </div>
      )}
      
      {/* Header */}
      <div className="board-header">
        <Chip
          label={label}
          icon={
            label.toLowerCase() === 'done' ? (
              <CheckCircleIcon sx={{ fontSize: 16, color: 'green' }} />
            ) : (
              <HourglassBottomIcon sx={{ fontSize: 16, color: 'orange' }} />
            )
          }
          color={getColorByLabel(label)}
          variant="outlined"
          size="small"
          sx={{ pr: 2, justifyContent: 'start', pl: 0.5 }}
        />
        <SettingsMenu actions={boardActions} />
      </div>

      {/* Task Cards */}
      <div className="task-cards">
        {localTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            users={task.users}
            assignedAt={task.assignedAt}
            priority={task.priority}
            actions={[
              {
                label: 'Edit',
                icon: <Edit sx={{ fontSize: 18 }} />,
                onClick: () => handleOpenEditDialog(task),
              },
              {
                label: 'Delete',
                icon: <Delete sx={{ fontSize: 18 }} />,
                onClick: () => handleDeleteTask(task.id),
              },
              {
                label: 'View',
                icon: <LabelImportant sx={{ fontSize: 18 }} />,
                onClick: () => {
                  // Show task details in a dialog or modal
                  console.log('View Task', task);
                },
              },
            ]}
          />
        ))}
      </div>

      {/* Add Task Dialog */}
      <TaskDialog
        isOpen={isAddTaskDialogOpen}
        onClose={handleCloseAddDialog}
        mode="add"
      />

      {/* Edit Task Dialog */}
      <TaskDialog
        isOpen={isEditTaskDialogOpen}
        onClose={handleCloseEditDialog}
        mode="edit"
      />
      
      {/* Feedback Snackbar */}
      <Snackbar
        open={showFeedback}
        autoHideDuration={6000}
        onClose={handleFeedbackClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleFeedbackClose}
          severity={feedback.severity}
          sx={{ width: '100%' }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Board;
