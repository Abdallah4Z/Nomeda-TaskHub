import React from 'react'
import SettingsMenu from '../../../Common/SettingsMenu'
import TaskCard from '../../../Tasks/TaskCard'
import useTasks from '../../../../hooks/useTasks'
import './board.css'
import {Add, Delete, Edit, LabelImportant} from '@mui/icons-material' // Import Material-UI icons
import LoadingSpinner from '../../../Common/LoadingSpinner'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {Chip} from '@mui/material'

interface Action {
  label: string
  icon?: React.ReactNode
  onClick: () => void
}

const Board: React.FC<{label: string}> = ({label}) => {
  const {tasks, loading} = useTasks() // Use the custom hook for tasks

  // Static actions for the board header
  const boardActions: Action[] = [
    {
      label: 'Add',
      icon: <Add sx={{fontSize: 18}} />, // Adjust size using sx prop
      onClick: () => console.log('Add Task'),
    },
    {
      label: 'Delete',
      icon: <Delete sx={{fontSize: 18}} />, // Adjust size using sx prop
      onClick: () => console.log('Delete Board'),
    },
  ]

  const getColorByLabel = (label: string) => {
    switch (label.toLowerCase()) {
      case 'to do':
        return 'warning' // yellow
      case 'in progress':
        return 'info' // blue
      case 'done':
        return 'success' // green
      case 'blocked':
        return 'error' // red
      case 'maniak':
        return 'secondary' // purple
      case 'ahmed':
        return 'primary' // blue
      default:
        return 'default'
    }
  }

  // Static actions for the task card settings menu
  const taskActions: Action[] = [
    {
      label: 'Edit',
      icon: <Edit sx={{fontSize: 18}} />, // Adjust size using sx prop
      onClick: () => console.log('Edit Task'),
    },
    {
      label: 'Delete',
      icon: <Delete sx={{fontSize: 18}} />, // Adjust size using sx prop
      onClick: () => console.log('Delete Task'),
    },
    {
      label: 'View',
      icon: <LabelImportant sx={{fontSize: 18}} />, // Adjust size using sx prop
      onClick: () => console.log('View Task'),
    },
  ]

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="board">
      {/* Header */}
      <div className="board-header">
        <Chip
          label={label}
          icon={
            label.toLowerCase() == 'done'? (
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
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            title={task.title}
            users={task.users}
            assignedAt={task.assignedAt}
            priority={task.priority}
            actions={taskActions} // Pass the taskActions to the card
          />
        ))}
      </div>
    </div>
  )
}

export default Board
