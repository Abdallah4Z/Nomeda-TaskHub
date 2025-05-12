import React from 'react'
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material'
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material'
import {User} from '../../scripts/types'

interface PasswordSectionProps {
  isEditing: boolean
  formData: Partial<User> & {currentPassword?: string; newPassword?: string}
  showPassword: boolean
  showNewPassword: boolean
  setShowPassword: (show: boolean) => void
  setShowNewPassword: (show: boolean) => void
  handleInputChange: (
    field: keyof typeof FormData,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PasswordSection: React.FC<PasswordSectionProps> = ({
  isEditing,
  formData,
  showPassword,
  showNewPassword,
  setShowPassword,
  setShowNewPassword,
  handleInputChange,
}) => {
  const theme = useTheme()

  return (
    <Grid item xs={12}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 'medium',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            width: 4,
            height: 24,
            backgroundColor: theme.palette.primary.main,
            marginRight: 2,
            borderRadius: 2,
          },
        }}
      >
        Change Password
      </Typography>
      {isEditing && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Current Password"
              value={formData.currentPassword}
              onChange={handleInputChange('currentPassword')}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.02)',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type={showNewPassword ? 'text' : 'password'}
              label="New Password"
              value={formData.newPassword}
              onChange={handleInputChange('newPassword')}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.02)',
                },
              }}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default PasswordSection
