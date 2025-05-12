import React from 'react'
import {Paper, Typography, Button, useTheme} from '@mui/material'

interface DangerZoneProps {
  onDeleteAccount: () => void
}

const DangerZone: React.FC<DangerZoneProps> = ({onDeleteAccount}) => {
  const theme = useTheme()

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        bgcolor:
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(255, 0, 0, 0.05)',
        border: '1px solid',
        borderColor: theme.palette.error.main,
      }}
    >
      <Typography variant="h6" color="error" sx={{mb: 2, fontWeight: 'medium'}}>
        Danger Zone
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
        Once you delete your account, there is no going back. Please be certain.
      </Typography>
      <Button
        variant="outlined"
        color="error"
        sx={{
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 2,
            bgcolor: 'error.main',
            color: 'white',
          },
          transition: 'all 0.2s',
        }}
        onClick={onDeleteAccount}
      >
        Delete Account
      </Button>
    </Paper>
  )
}

export default DangerZone
