import React, { useState } from 'react'
import { Card } from '@mui/material'
import ListCardTitle from './ListCardTitle'
import ListCardAssignees from './ListCardAssignees'
import ListCardTime from './ListCardTime'
import ListCardLabel from './ListCardLabel'
import ListCardActions from './ListCardActions'
import PriorityLabel from '../../../Tasks/PriorityLabel'
import EditTaskDialog from './EditTaskDialog' // Import the dialog component

const ListCard = ({ task }: { task: any }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleEditClick = () => {
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const handleSaveTask = (updatedTask: any) => {
    // Here, you would typically update the task in the state or database
    console.log('Task updated:', updatedTask)
  }

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingY: 1,
          paddingX: 2,
          marginBottom: 1,
          borderRadius: 2,
          color: 'gray',
        }}
      >
        <ListCardTitle title={task.title} />
        <ListCardAssignees users={task.users} />
        <ListCardTime time={task.assignedAt} />
        <ListCardLabel />
        <PriorityLabel level={task.priority} />
        <ListCardActions onEdit={handleEditClick} />
      </Card>

      {/* Edit Task Dialog */}
      <EditTaskDialog
        open={dialogOpen}
        task={task}
        onClose={handleCloseDialog}
        onSave={handleSaveTask}
      />
    </>
  )
}

export default ListCard
