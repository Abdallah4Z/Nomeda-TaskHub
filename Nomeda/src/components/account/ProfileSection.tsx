import React from 'react'
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Stack,
  Tooltip,
  Link,
  useTheme,
} from '@mui/material'
import {
  Edit as EditIcon,
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material'
import {User} from '../../scripts/types'

interface ProfileSectionProps {
  user: User
  isEditing: boolean
  formData: Partial<User>
  handlePhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleInputChange: (
    field: string,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  user,
  isEditing,
  formData,
  handlePhotoChange,
  handleInputChange,
}) => {
  const theme = useTheme()

  const getSocialLink = (platform: string, username: string) => {
    switch (platform) {
      case 'facebook':
        return `https://facebook.com/${username}`
      case 'github':
        return `https://github.com/${username}`
      case 'linkedin':
        return `https://linkedin.com/in/${username}`
      default:
        return ''
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {xs: 'column', sm: 'row'},
        alignItems: 'center',
        mb: 4,
        gap: 3,
      }}
    >
      <Box sx={{position: 'relative'}}>
        <Avatar
          src={user.photoUrl}
          sx={{
            width: 160,
            height: 160,
            border: `4px solid ${theme.palette.primary.main}`,
            boxShadow: theme.shadows[4],
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        <input
          accept="image/*"
          type="file"
          id="icon-button-file"
          onChange={handlePhotoChange}
          style={{display: 'none'}}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            component="span"
            sx={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              boxShadow: theme.shadows[2],
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                transform: 'scale(1.1)',
              },
              transition: 'transform 0.2s',
            }}
          >
            <EditIcon />
          </IconButton>
        </label>
      </Box>
      <Box
        sx={{
          textAlign: {xs: 'center', sm: 'left'},
          flex: 1,
          width: '100%',
        }}
      >
        <Typography variant="h4" sx={{mb: 1}}>
          {isEditing ? (
            <TextField
              value={formData.name}
              onChange={handleInputChange('name')}
              variant="standard"
              fullWidth
              placeholder="Your name"
            />
          ) : (
            user.name
          )}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mb: 2}}>
          Member since {new Date(user.joinedDate).toLocaleDateString()}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent={{xs: 'center', sm: 'flex-start'}}
        >
          {formData.facebook && (
            <Tooltip title="Facebook Profile">
              <IconButton
                component={Link}
                href={getSocialLink('facebook', formData.facebook)}
                target="_blank"
                sx={{
                  color: '#1877F2',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
            </Tooltip>
          )}
          {formData.github && (
            <Tooltip title="GitHub Profile">
              <IconButton
                component={Link}
                href={getSocialLink('github', formData.github)}
                target="_blank"
                sx={{
                  color: theme.palette.mode === 'dark' ? '#fff' : '#24292e',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          )}
          {formData.linkedin && (
            <Tooltip title="LinkedIn Profile">
              <IconButton
                component={Link}
                href={getSocialLink('linkedin', formData.linkedin)}
                target="_blank"
                sx={{
                  color: '#0A66C2',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Box>
    </Box>
  )
}

export default ProfileSection
