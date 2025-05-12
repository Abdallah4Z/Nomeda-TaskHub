import React, {useState} from 'react'
import {
  Typography,
  Box,
  useTheme,
  Paper,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  IconButton,
  SvgIcon,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import ChatIcon from '@mui/icons-material/Chat'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import EditIcon from '@mui/icons-material/Edit'
import IOSSwitch from '../../../IOS'

interface ContactInfo {
  email: string
  phone: string
  preferredContact: 'email' | 'phone' | 'chat'
}

interface SocialLinks {
  facebook: string
  twitter: string
  linkedin: string
  github: string
}

const ContactSettings: React.FC = () => {
  const theme = useTheme()
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'user@example.com',
    phone: '+1 (555) 123-4567',
    preferredContact: 'email',
  })

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: '',
    twitter: '',
    linkedin: '',
    github: '',
  })

  const [toggleStates, setToggleStates] = useState({
    emailNotifications: true,
    smsNotifications: false,
    liveChat: true,
    supportUpdates: true,
  })

  const [editing, setEditing] = useState<string | null>(null)

  const handleToggleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setToggleStates(prev => ({
        ...prev,
        [key]: event.target.checked,
      }))
    }

  const handleContactInfoChange =
    (field: keyof ContactInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setContactInfo(prev => ({
        ...prev,
        [field]: event.target.value,
      }))
    }

  const handleSocialLinkChange =
    (platform: keyof SocialLinks) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSocialLinks(prev => ({
        ...prev,
        [platform]: event.target.value,
      }))
    }

  return (
    <Box sx={{p: 2}}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: theme.palette.text.primary,
          mb: 3,
        }}
      >
        Contact Settings
      </Typography>
      {/* Contact Information Section */}
      <Paper
        elevation={0}
        sx={{
          bgcolor:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.02)',
          borderRadius: 2,
          p: 2,
          mb: 3,
        }}
      >
        <Typography variant="subtitle1" sx={{mb: 2, fontWeight: 500}}>
          Contact Information
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
              <EmailIcon sx={{mr: 1, color: theme.palette.primary.main}} />
              {editing === 'email' ? (
                <TextField
                  fullWidth
                  size="small"
                  value={contactInfo.email}
                  onChange={handleContactInfoChange('email')}
                  onBlur={() => setEditing(null)}
                  autoFocus
                />
              ) : (
                <>
                  <Typography sx={{flex: 1}}>{contactInfo.email}</Typography>
                  <IconButton size="small" onClick={() => setEditing('email')}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <PhoneIcon sx={{mr: 1, color: theme.palette.primary.main}} />
              {editing === 'phone' ? (
                <TextField
                  fullWidth
                  size="small"
                  value={contactInfo.phone}
                  onChange={handleContactInfoChange('phone')}
                  onBlur={() => setEditing(null)}
                  autoFocus
                />
              ) : (
                <>
                  <Typography sx={{flex: 1}}>{contactInfo.phone}</Typography>
                  <IconButton size="small" onClick={() => setEditing('phone')}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {/* Notification Preferences */}
      <Paper
        elevation={0}
        sx={{
          bgcolor:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.02)',
          borderRadius: 2,
          p: 2,
          mb: 3,
        }}
      >
        <Typography variant="subtitle1" sx={{mb: 2, fontWeight: 500}}>
          Communication Preferences
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <EmailIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Email Notifications"
              secondary="Receive updates and notifications via email"
            />
            <ListItemSecondaryAction>
              <IOSSwitch
                checked={toggleStates.emailNotifications}
                onChange={handleToggleChange('emailNotifications')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <PhoneIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="SMS Notifications"
              secondary="Get important alerts via text message"
            />
            <ListItemSecondaryAction>
              <IOSSwitch
                checked={toggleStates.smsNotifications}
                onChange={handleToggleChange('smsNotifications')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <ChatIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Live Chat"
              secondary="Enable live chat support"
            />
            <ListItemSecondaryAction>
              <IOSSwitch
                checked={toggleStates.liveChat}
                onChange={handleToggleChange('liveChat')}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>{' '}
      {/* Social Media Links */}
      <Paper
        elevation={0}
        sx={{
          bgcolor:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.02)',
          borderRadius: 2,
          p: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{mb: 2, fontWeight: 500}}>
          Social Media Links
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <FacebookIcon color="primary" />
              <TextField
                fullWidth
                size="small"
                label="Facebook"
                value={socialLinks.facebook}
                onChange={handleSocialLinkChange('facebook')}
                placeholder="Enter your Facebook profile URL"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.02)',
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <TwitterIcon color="primary" />
              <TextField
                fullWidth
                size="small"
                label="Twitter"
                value={socialLinks.twitter}
                onChange={handleSocialLinkChange('twitter')}
                placeholder="Enter your Twitter profile URL"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.02)',
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <LinkedInIcon color="primary" />
              <TextField
                fullWidth
                size="small"
                label="LinkedIn"
                value={socialLinks.linkedin}
                onChange={handleSocialLinkChange('linkedin')}
                placeholder="Enter your LinkedIn profile URL"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.02)',
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <GitHubIcon color="primary" />
              <TextField
                fullWidth
                size="small"
                label="GitHub"
                value={socialLinks.github}
                onChange={handleSocialLinkChange('github')}
                placeholder="Enter your GitHub profile URL"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.02)',
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {/* Save Button */}
      <Box sx={{mt: 3, display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            px: 4,
            py: 1,
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  )
}

export default ContactSettings
