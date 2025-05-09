import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Grid, FormControl, InputLabel, Select, Checkbox, ListItemText } from '@mui/material'

interface EditTaskDialogProps {
  open: boolean
  task: any
  onClose: () => void
  onSave: (task: any) => void
}

const EditTaskDialog = ({ open, task, onClose, onSave }: EditTaskDialogProps) => {
  const [editedTask, setEditedTask] = useState(task)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown }>) => {
    const { name, value } = e.target
    setEditedTask((prev) => ({
      ...prev,
      [name as string]: value,
    }))
  }

  const handleDateChange = (date: string) => {
    setEditedTask((prev) => ({
      ...prev,
      assignedAt: date,
    }))
  }

  const handleSave = () => {
    onSave(editedTask)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        {/* Task Title */}
        <TextField
          name="title"
          label="Task Title"
          fullWidth
          value={editedTask.title}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />

        {/* Task Priority */}
        <TextField
          name="priority"
          label="Priority"
          fullWidth
          select
          value={editedTask.priority}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>

        {/* Task Assignees */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Assignees</InputLabel>
          <Select
            multiple
            name="users"
            value={editedTask.users}
            onChange={handleInputChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {/* Assume you have a list of users to assign */}
            {['User1', 'User2', 'User3'].map((user) => (
              <MenuItem key={user} value={user}>
                <Checkbox checked={editedTask.users.includes(user)} />
                <ListItemText primary={user} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Task Date */}
        <TextField
          name="assignedAt"
          label="Assigned Date"
          type="date"
          fullWidth
          value={editedTask.assignedAt}
          onChange={(e) => handleDateChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginBottom: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditTaskDialog
