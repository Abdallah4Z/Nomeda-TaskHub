import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Tooltip,
  Divider,
} from '@mui/material'
import UserAvatars from '../Common/UserAvatars'
import PriorityLabel from './PriorityLabel'
import SettingsMenu from '../Common/SettingsMenu' // your existing component
import AssignmentIcon from '@mui/icons-material/Assignment'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
interface User {
  name: string
  avatar: string
}

interface Action {
  label: string
  icon?: React.ReactNode
  onClick: () => void
}

interface TaskCardProps {
  title: string
  users: User[]
  assignedAt: string
  priority: 'High' | 'Normal' | 'Low'
  actions: Action[]
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  users,
  assignedAt,
  priority,
  actions,
}) => {
  return (
    <Card sx={{maxWidth: 250, borderRadius: 1, p: 1, boxShadow: 1}}>
      <CardContent sx={{p: 1}}>
        <Stack spacing={1}>
          {/* Title Row with Settings */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography sx={{fontSize: 16}}>{title}</Typography>
            <SettingsMenu actions={actions} />
          </Box>
          <Divider sx={{borderColor: 'grey.200'}} />

          {/* Row: Users on the left */}
          <Box display="flex" justifyContent="flex-start">
            <UserAvatars users={users} size={25} />
          </Box>
          {/* Row: Assigned */}
          <Stack direction="row" alignItems="center">
            <Tooltip title="Assigned">
              <AssignmentIcon sx={{mr: 1, fontSize: 14, color: 'grey.600'}} />
            </Tooltip>
            <Typography variant="body2" color="text.secondary" fontSize={13}>
              {assignedAt}
            </Typography>
          </Stack>
          {/* Row: Priority */}
          <Stack direction="row" alignItems="center">
            <Tooltip title="Priority">
              <LabelImportantIcon
                sx={{
                  mr: 1,
                  fontSize: 14,
                  color:
                    priority === 'High'
                      ? 'error.main'
                      : priority === 'Normal'
                      ? 'warning.main'
                      : 'success.main',
                }}
              />
            </Tooltip>
            <PriorityLabel level={priority} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TaskCard
