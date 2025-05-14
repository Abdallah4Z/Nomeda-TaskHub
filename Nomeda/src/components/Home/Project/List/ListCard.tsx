import React, {useState} from 'react'
import {Card} from '@mui/material'
import {
  Dialog,
  DialogTitle,
  DialogContent,  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Snackbar,
  Alert,
} from '@mui/material'
import DeleteConfirmationDialog from '../../../Common/DeleteConfirmationDialog'
import ListCardTitle from './ListCardTitle'
import ListCardAssignees from './ListCardAssignees'
import ListCardTime from './ListCardTime'
import ListCardLabel from './ListCardLabel'
import ListCardActions from './ListCardActions'
import PriorityLabel from '../../../Tasks/PriorityLabel'

import { FormattedTask } from '../../../../types/project';

interface ListCardProps {
  task: FormattedTask;
  onEdit?: (updatedTask: FormattedTask) => void;
  onDelete?: (taskId: string) => Promise<void>;
  onView?: (taskId: string) => void;
}

const ListCard: React.FC<ListCardProps> = ({
  task,
  onEdit,
  onDelete,
  onView,
}) => {  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editedTask, setEditedTask] = useState<FormattedTask>(task)
  const [isDeleting, setIsDeleting] = useState(false)
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleEditClick = () => {
    setDialogOpen(true)
    setEditedTask({...task})
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditedTask({...task}) // Reset to original
  }
  const handleSaveTask = () => {
    if (onEdit && editedTask.title.trim()) {
      onEdit(editedTask)
      setDialogOpen(false)
    }
  }
  
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      if (onDelete) {
        await onDelete(task.id)
        // Close the dialog once deletion is successful
        setDeleteDialogOpen(false)
        setNotification({
          open: true,
          message: 'Task deleted successfully',
          severity: 'success'
        })
      }
    } catch (error) {
      console.error("Error deleting task:", error)
      setNotification({
        open: true,
        message: 'Failed to delete task',
        severity: 'error'
      })
      // Keep the dialog open if there's an error
    } finally {
      setIsDeleting(false)
    }
  }
  const handleView = () => {
    if (onView) {
      onView(task.id)
    }
  }

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          marginBottom: 1,
          borderRadius: 2,
          color: 'text.secondary',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <ListCardTitle title={task.title || ''} />
        <ListCardAssignees users={task.users} />
        <ListCardTime time={task.assignedAt || ''} />
        <ListCardLabel 
          status={task.status} 
          taskId={task.id}
          onStatusChange={(newStatus) => {
            if (onEdit) {
              onEdit({...task, status: newStatus})
            }
          }} 
        />
        <PriorityLabel level={task.priority} />
        <ListCardActions
          onEdit={handleEditClick}
          onDelete={() => setDeleteDialogOpen(true)}
          onView={handleView}
        />
      </Card>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Box sx={{pt: 2, pb: 1}}>
            <TextField
              autoFocus
              label="Task Title"
              fullWidth
              value={editedTask.title}
              onChange={e =>
                setEditedTask({...editedTask, title: e.target.value})
              }
            />
          </Box>
          <FormControl fullWidth sx={{mt: 2}}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={editedTask.priority}
              label="Priority"
              onChange={e =>
                setEditedTask({
                  ...editedTask,
                  priority: e.target.value as 'High' | 'Normal' | 'Low',
                })
              }
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveTask} color="primary" variant="contained">
            Save Changes
          </Button>        </DialogActions>
      </Dialog>      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        title="Delete Task"
        itemName={task.title}
        message="Are you sure you want to delete this task? This action cannot be undone."
        isOpen={deleteDialogOpen}
        isDeleting={isDeleting}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />

      {/* Notification Snackbar */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNotification(prev => ({ ...prev, open: false }))} 
          severity={notification.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ListCard
