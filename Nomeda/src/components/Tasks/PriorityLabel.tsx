import React from 'react'
import { Box, Typography } from '@mui/material'
import { LabelImportant } from '@mui/icons-material'

interface PriorityLabelProps {
  level: 'High' | 'Normal' | 'Low' | null
}

const PriorityLabel: React.FC<PriorityLabelProps> = ({ level }) => {
  const getIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return <LabelImportant sx={{ color: 'red', fontSize: 18, marginRight: 1 }} />
      case 'Normal':
        return <LabelImportant sx={{ color: 'yellow', fontSize: 18, marginRight: 1 }} />
      case 'Low':
        return <LabelImportant sx={{ color: 'green', fontSize: 18, marginRight: 1 }} />
      default:
        return null
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {getIcon(level ?? '')}
      <Typography sx={{ fontSize: 13 }}>
        {level ? `${level} Priority` : 'No Priority'}
      </Typography>
    </Box>
  )
}

export default PriorityLabel
