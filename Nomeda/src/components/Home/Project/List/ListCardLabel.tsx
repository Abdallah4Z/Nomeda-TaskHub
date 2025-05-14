import React, { useState } from 'react'
import { Box, Chip, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RateReviewIcon from '@mui/icons-material/RateReview'
import useTasks from '../../../../hooks/useTasks'
import { useParams } from 'react-router-dom'

interface ListCardLabelProps {
  status: string
  taskId?: string
  onStatusChange?: (status: string) => void
}

const ListCardLabel: React.FC<ListCardLabelProps> = ({ status, taskId, onStatusChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { id: projectId } = useParams<{ id: string }>()
  const { updateTask, refreshTasks } = useTasks(projectId)
  
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleStatusChange = async (newStatus: string) => {
    if (taskId && newStatus !== status) {
      try {
        if (updateTask) {
          await updateTask(taskId, { status: newStatus as 'todo' | 'in-progress' | 'review' | 'done' })
          if (onStatusChange) {
            onStatusChange(newStatus)
          }
          // Refresh tasks to update UI
          refreshTasks()
        }
      } catch (error) {
        console.error('Failed to update task status:', error)
      }
    }
    setAnchorEl(null)
  }

  const getStatusLabel = (status: string): string => {
    switch(status) {
      case 'todo': return 'To Do'
      case 'in-progress': return 'In Progress'
      case 'review': return 'Review'
      case 'done': return 'Done'
      default: return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'todo': return '#3498db'  // blue
      case 'in-progress': return '#f39c12'  // orange
      case 'review': return '#9b59b6'  // purple
      case 'done': return '#2ecc71'  // green
      default: return '#95a5a6'  // grey
    }
  }

  return (
    <Box sx={{ flex: 1, display:'flex', alignItems: 'center' }}>
      <Chip
        label={getStatusLabel(status)}
        variant="outlined"
        size="small"
        sx={{ 
          height: 24, 
          fontSize: 12,
          borderColor: getStatusColor(status),
          color: getStatusColor(status),
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: `${getStatusColor(status)}10`
          }
        }}
        onClick={handleClick}
      />
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem 
          onClick={() => handleStatusChange('todo')}
          selected={status === 'todo'}
        >
          <ListItemIcon>
            <ScheduleIcon fontSize="small" sx={{ color: '#3498db' }} />
          </ListItemIcon>
          <Typography variant="body2">To Do</Typography>
        </MenuItem>
        <MenuItem 
          onClick={() => handleStatusChange('in-progress')}
          selected={status === 'in-progress'}
        >
          <ListItemIcon>
            <PlayArrowIcon fontSize="small" sx={{ color: '#f39c12' }} />
          </ListItemIcon>
          <Typography variant="body2">In Progress</Typography>
        </MenuItem>
        <MenuItem 
          onClick={() => handleStatusChange('review')}
          selected={status === 'review'}
        >
          <ListItemIcon>
            <RateReviewIcon fontSize="small" sx={{ color: '#9b59b6' }} />
          </ListItemIcon>
          <Typography variant="body2">Review</Typography>
        </MenuItem>
        <MenuItem 
          onClick={() => handleStatusChange('done')}
          selected={status === 'done'}
        >
          <ListItemIcon>
            <CheckCircleOutlineIcon fontSize="small" sx={{ color: '#2ecc71' }} />
          </ListItemIcon>
          <Typography variant="body2">Done</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ListCardLabel
