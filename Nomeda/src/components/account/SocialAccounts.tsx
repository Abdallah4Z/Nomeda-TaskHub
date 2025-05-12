import React from 'react'
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  IconButton,
  Link,
  useTheme,
} from '@mui/material'
import {
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material'
import {User} from '../../scripts/types'

interface SocialAccountsProps {
  isEditing: boolean
  formData: Partial<User>
  handleInputChange: (
    field: string,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SocialAccounts: React.FC<SocialAccountsProps> = ({
  isEditing,
  formData,
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
    <Grid item component="div" xs={12} md={6}>
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
        Social Accounts
      </Typography>
      <List>
        <ListItem sx={{px: 0}}>
          <FacebookIcon
            sx={{
              mr: 2,
              color: '#1877F2',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
          <ListItemText
            primary={
              <Typography variant="subtitle2" color="text.secondary">
                Facebook Username
              </Typography>
            }
            secondary={
              isEditing ? (
                <TextField
                  value={formData.facebook}
                  onChange={handleInputChange('facebook')}
                  variant="standard"
                  fullWidth
                  placeholder="Your Facebook username"
                />
              ) : (
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Typography variant="body1">
                    {formData.facebook || 'Not provided'}
                  </Typography>
                  {formData.facebook && (
                    <IconButton
                      size="small"
                      component={Link}
                      href={getSocialLink('facebook', formData.facebook)}
                      target="_blank"
                    >
                      <LaunchIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              )
            }
          />
        </ListItem>
        <ListItem sx={{px: 0}}>
          <GitHubIcon
            sx={{
              mr: 2,
              color: theme.palette.mode === 'dark' ? '#fff' : '#24292e',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
          <ListItemText
            primary={
              <Typography variant="subtitle2" color="text.secondary">
                GitHub Username
              </Typography>
            }
            secondary={
              isEditing ? (
                <TextField
                  value={formData.github}
                  onChange={handleInputChange('github')}
                  variant="standard"
                  fullWidth
                  placeholder="Your GitHub username"
                />
              ) : (
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Typography variant="body1">
                    {formData.github || 'Not provided'}
                  </Typography>
                  {formData.github && (
                    <IconButton
                      size="small"
                      component={Link}
                      href={getSocialLink('github', formData.github)}
                      target="_blank"
                    >
                      <LaunchIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              )
            }
          />
        </ListItem>
        <ListItem sx={{px: 0}}>
          <LinkedInIcon
            sx={{
              mr: 2,
              color: '#0A66C2',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
          <ListItemText
            primary={
              <Typography variant="subtitle2" color="text.secondary">
                LinkedIn Username
              </Typography>
            }
            secondary={
              isEditing ? (
                <TextField
                  value={formData.linkedin}
                  onChange={handleInputChange('linkedin')}
                  variant="standard"
                  fullWidth
                  placeholder="Your LinkedIn username"
                />
              ) : (
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Typography variant="body1">
                    {formData.linkedin || 'Not provided'}
                  </Typography>
                  {formData.linkedin && (
                    <IconButton
                      size="small"
                      component={Link}
                      href={getSocialLink('linkedin', formData.linkedin)}
                      target="_blank"
                    >
                      <LaunchIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              )
            }
          />
        </ListItem>
      </List>
    </Grid>
  )
}

export default SocialAccounts
