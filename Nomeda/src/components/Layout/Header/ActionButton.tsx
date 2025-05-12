import React from 'react'
import {IconButton, styled, Badge, Tooltip} from '@mui/material'

interface ActionButtonProps {
  icon: React.ReactNode
  label: string
  badgeCount?: number
  onClick?: () => void
  sx?: SxProps<Theme>
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  badgeCount,
  onClick,
  sx,
}) => {
  return (
    <Tooltip title={label} arrow>
      <IconButton
        onClick={onClick}
        aria-label={label}
        size="small"
        sx={{
          borderRadius: '12px',
          padding: '8px',
          color: '#5f6368',
          backgroundColor: 'transparent',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#f5f5f5',
            color: '#1a73e8',
          },
          ...sx,
        }}
      >
        {badgeCount !== undefined && badgeCount > 0 ? (
          <Badge
            badgeContent={badgeCount}
            color="error"
            max={99}
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '10px',
                height: '18px',
                minWidth: '18px',
              },
            }}
          >
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  )
}

export default ActionButton
