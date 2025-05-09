import React, { useEffect, useState } from 'react'
import SettingsMenu from '../../../Common/SettingsMenu'
import TaskCard from '../../../Tasks/TaskCard'
import useTasks from '../../../../hooks/useTasks'
import '../../../../style/board.css'
import {Add, Delete, Edit, LabelImportant} from '@mui/icons-material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
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
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface Action {
  label: string
  icon?: React.ReactNode
  onClick: () => void
}

interface Task {
  id: string
  title: string
  users: { name: string; avatar: string }[]
  assignedAt: string
  priority: 'High' | 'Normal' | 'Low'
  deadline?: Date
  assignees: string[]
}

const Board: React.FC<{label: string}> = ({label}) => {
  const {tasks} = useTasks()
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks)
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'Normal' as 'High' | 'Normal' | 'Low',
    assignees: [] as string[],
    deadline: new Date() as Date | null,
  })

  // Available assignees (you can expand this list)
  const availableAssignees = [
    { name: 'John Doe', avatar: `https://robohash.org/john?set=set5` },
    { name: 'Jane Smith', avatar: `https://robohash.org/jane?set=set5` },
    { name: 'Mike Johnson', avatar: `https://robohash.org/mike?set=set5` },
  ]

  const handleOpenAddDialog = () => {
    setIsAddTaskDialogOpen(true)
  }
  const handleCloseAddDialog = () => {
    setIsAddTaskDialogOpen(false)
    setNewTask({
      title: '',
      priority: 'Normal',
      assignees: [],
      deadline: new Date(),
    })
  }
  const handleOpenEditDialog = (task: Task) => {
    setSelectedTask(task)
    setNewTask({
      title: task.title,
      priority: task.priority,
      assignees: task.assignees,
      deadline: task.deadline || new Date(),
    })
    setIsEditTaskDialogOpen(true)
  }

  const handleCloseEditDialog = () => {
    setIsEditTaskDialogOpen(false)
    setSelectedTask(null)
  }

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.assignees.length > 0) {
      const assigneesData = newTask.assignees
        .map(name => availableAssignees.find(a => a.name === name))
        .filter(Boolean);
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        users: assigneesData as { name: string; avatar: string }[],
        assignedAt: new Date().toLocaleDateString(),
        priority: newTask.priority,
        deadline: newTask.deadline || undefined,
        assignees: newTask.assignees,
      }
      setLocalTasks([...localTasks, task])
      handleCloseAddDialog()
    }
  }

  const handleEditTask = () => {
    if (selectedTask && newTask.title.trim() && newTask.assignees.length > 0) {
      const assigneesData = newTask.assignees
        .map(name => availableAssignees.find(a => a.name === name))
        .filter(Boolean);
      const updatedTask: Task = {
        ...selectedTask,
        title: newTask.title,
        users: assigneesData as { name: string; avatar: string }[],
        priority: newTask.priority,
        deadline: newTask.deadline || undefined,
        assignees: newTask.assignees,
      }
      setLocalTasks(localTasks.map(task => 
        task.id === selectedTask.id ? updatedTask : task
      ))
      handleCloseEditDialog()
    }
  }

  // Handler for deleting the board
  const handleDeleteBoard = () => {
    setLocalTasks([]) // Clear all tasks in the board
  }

  // Handler for deleting a task
  const handleDeleteTask = (taskId: string) => {
    setLocalTasks(localTasks.filter(task => task.id !== taskId))
  }

  // Static actions for the board header
  const boardActions: Action[] = [
    {
      label: 'Add',
      icon: <Add sx={{fontSize: 18}} />,
      onClick: handleOpenAddDialog,
    },
    {
      label: 'Delete',
      icon: <Delete sx={{fontSize: 18}} />,
      onClick: handleDeleteBoard,
    },
  ]

  // Actions for the task card settings menu
  const getTaskActions = (taskId: string): Action[] => [
    {
      label: 'Edit',
      icon: <Edit sx={{fontSize: 18}} />,
      onClick: () => handleOpenEditDialog(localTasks.find(task => task.id === taskId)!),
    },
    {
      label: 'Delete',
      icon: <Delete sx={{fontSize: 18}} />,
      onClick: () => handleDeleteTask(taskId),
    },
    {
      label: 'View',
      icon: <LabelImportant sx={{fontSize: 18}} />,
      onClick: () => console.log('View Task', taskId),
    },
  ]

  const getColorByLabel = (label: string) => {
    switch (label.toLowerCase()) {
      case 'to do':
        return 'warning'
      case 'in progress':
        return 'info'
      case 'done':
        return 'success'
      case 'blocked':
        return 'error'
      case 'maniak':
        return 'secondary'
      case 'ahmed':
        return 'primary'
      default:
        return 'default'
    }
  }
  const TaskDialog = ({ isOpen, onClose, mode }: { isOpen: boolean, onClose: () => void, mode: 'add' | 'edit' }) => {    const [formData, setFormData] = useState({
      title: mode === 'edit' ? newTask.title : '',
      priority: mode === 'edit' ? newTask.priority : 'Normal' as 'High' | 'Normal' | 'Low',
      assignees: mode === 'edit' ? newTask.assignees : [] as string[],
      deadline: mode === 'edit' ? newTask.deadline : new Date(),
    });

    // Update form data when editing a different task
    useEffect(() => {
      if (mode === 'edit') {
        setFormData({
          title: newTask.title,
          priority: newTask.priority,
          assignees: newTask.assignees,
          deadline: newTask.deadline,
        });
      }
    }, [mode, newTask]);

    const handleSubmit = () => {
      // Update parent state only when submitting
      setNewTask(formData);
      if (mode === 'add') {
        handleAddTask();
      } else {
        handleEditTask();
      }
    };

    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{mode === 'add' ? 'Add New Task' : 'Edit Task'}</DialogTitle>
        <DialogContent>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, pt: 2}}>
            <TextField
              autoFocus
              label="Task Title"
              fullWidth
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                label="Priority"
                onChange={e =>
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
            </FormControl>            <FormControl fullWidth>
              <InputLabel>Assignees</InputLabel>
              <Select
                multiple
                value={formData.assignees}
                label="Assignees"
                onChange={e => {
                  const value = e.target.value as string[];
                  setFormData({...formData, assignees: value});
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map(value => {
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
                onChange={(newValue) => setFormData({...formData, deadline: newValue})}
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
          >
            {mode === 'add' ? 'Add Task' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <div className="board">
      {/* Header */}
      <div className="board-header">
        <Chip
          label={label}
          icon={
            label.toLowerCase() === 'done' ? (
              <CheckCircleIcon sx={{fontSize: 16, color: 'green'}} />
            ) : (
              <HourglassBottomIcon sx={{fontSize: 16, color: 'orange'}} />
            )
          }
          color={getColorByLabel(label)}
          variant="outlined"
          size="small"
          sx={{pr: 2, justifyContent: 'start', pl: 0.5}}
        />
        <SettingsMenu actions={boardActions} />
      </div>

      {/* Task Cards */}
      <div className="task-cards">
        {localTasks.map(task => (
          <TaskCard
            key={task.id}
            title={task.title}
            users={task.users}
            assignedAt={task.assignedAt}
            priority={task.priority}
            actions={[
              {
                label: 'Edit',
                icon: <Edit sx={{fontSize: 18}} />,
                onClick: () => handleOpenEditDialog(task),
              },
              {
                label: 'Delete',
                icon: <Delete sx={{fontSize: 18}} />,
                onClick: () => handleDeleteTask(task.id),
              },
              {
                label: 'View',
                icon: <LabelImportant sx={{fontSize: 18}} />,
                onClick: () => {
                  // Show task details in a dialog or modal
                  console.log('View Task', task)
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
    </div>
  )
}

export default Board
