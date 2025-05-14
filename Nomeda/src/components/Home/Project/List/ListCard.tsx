import React, {useState} from 'react'
import {Card} from '@mui/material'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material'
import ListCardTitle from './ListCardTitle'
import ListCardAssignees from './ListCardAssignees'
import ListCardTime from './ListCardTime'
import ListCardLabel from './ListCardLabel'
import ListCardActions from './ListCardActions'
import PriorityLabel from '../../../Tasks/PriorityLabel'

import { FormattedTask, FormattedUser, TaskAction } from '../../../../types/project';

interface ListCardProps {  task: FormattedTask
  onEdit?: (updatedTask: FormattedTask) => void
  onDelete?: (taskId: string) => void
  onView?: (taskId: string) => void
}

const ListCard: React.FC<ListCardProps> = ({
  task,
  onEdit,
  onDelete,
  onView,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editedTask, setEditedTask] = useState<FormattedTask>(task)

  // Available assignees (you can expand this list)
  const availableAssignees = [
    {name: 'John Doe', avatar: `https://robohash.org/john?set=set5`},
    {name: 'Jane Smith', avatar: `https://robohash.org/jane?set=set5`},
    {name: 'Mike Johnson', avatar: `https://robohash.org/mike?set=set5`},
  ]

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

  const handleDelete = () => {
    onDelete?.(task.id)
    setDeleteDialogOpen(false)
  }

  const handleView = () => {
    setViewDialogOpen(true)
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
        <ListCardTitle title={task.title} />
        <ListCardAssignees users={task.users} />        <ListCardTime time={task.assignedAt} />
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
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ListCard
