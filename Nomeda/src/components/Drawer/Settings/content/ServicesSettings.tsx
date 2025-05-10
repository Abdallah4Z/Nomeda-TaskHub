import React, {useState} from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Box,
  useTheme,
  Paper,
  Tooltip,
  IconButton,
  Collapse,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SyncIcon from '@mui/icons-material/Sync'
import BackupIcon from '@mui/icons-material/Backup'
import SecurityIcon from '@mui/icons-material/Security'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import IOSSwitch from '../../../IOS'

interface ToggleStates {
  emailNotifications: boolean
  pushNotifications: boolean
  autoSync: boolean
  autoBackup: boolean
  twoFactorAuth: boolean
  apiAccess: boolean
}

interface Service {
  key: keyof ToggleStates
  title: string
  description: string
  icon: JSX.Element
  info: string
}

const ServicesSettings: React.FC = () => {
  const theme = useTheme()

  const [toggleStates, setToggleStates] = useState<ToggleStates>({
    emailNotifications: false,
    pushNotifications: true,
    autoSync: true,
    autoBackup: false,
    twoFactorAuth: false,
    apiAccess: false,
  })

  const [expandedInfo, setExpandedInfo] = useState<keyof ToggleStates | null>(
    null,
  )

  const handleToggleChange =
    (key: keyof ToggleStates) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setToggleStates(prev => ({
        ...prev,
        [key]: event.target.checked,
      }))
    }

  const toggleInfo = (key: keyof ToggleStates) => {
    setExpandedInfo(expandedInfo === key ? null : key)
  }

  const services: Service[] = [
    {
      key: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive task updates and reminders via email',
      icon: <NotificationsIcon />,
      info: 'We will send you email notifications for important updates, task assignments, and deadline reminders.',
    },
    {
      key: 'pushNotifications',
      title: 'Push Notifications',
      description: 'Enable desktop notifications for real-time updates',
      icon: <NotificationsIcon />,
      info: 'Get instant notifications on your desktop for messages, updates, and task changes.',
    },
    {
      key: 'autoSync',
      title: 'Auto Synchronization',
      description: 'Keep your data synchronized across devices',
      icon: <SyncIcon />,
      info: 'Your data will be automatically synchronized every 5 minutes across all your devices.',
    },
    {
      key: 'autoBackup',
      title: 'Automatic Backup',
      description: 'Regular backups of your project data',
      icon: <BackupIcon />,
      info: 'Your project data will be automatically backed up daily to ensure data safety.',
    },
    {
      key: 'twoFactorAuth',
      title: 'Two-Factor Authentication',
      description: 'Enhanced security for your account',
      icon: <SecurityIcon />,
      info: 'Add an extra layer of security to your account with 2FA verification.',
    },
    {
      key: 'apiAccess',
      title: 'API Access',
      description: 'Enable API access for integrations',
      icon: <IntegrationInstructionsIcon />,
      info: 'Allow third-party applications to access your data through our secure API.',
    },
  ]

  return (
    <Box sx={{p: 2}}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.text.primary
              : theme.palette.text.primary,
          mb: 3,
        }}
      >
        Services & Integrations
      </Typography>

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
        <List sx={{width: '100%'}}>
          {services.map((service, index) => (
            <React.Fragment key={service.key}>
              <ListItem
                sx={{
                  py: 2,
                  bgcolor: 'transparent',
                  mb: 1,
                  transition: 'background-color 0.2s',
                }}
              >
                <Box sx={{display: 'flex', alignItems: 'center', mr: 2}}>
                  {React.cloneElement(service.icon, {
                    sx: {
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.primary.light
                          : theme.palette.primary.main,
                    },
                  })}
                </Box>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{fontWeight: 500}}>
                      {service.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                      <Collapse
                        in={expandedInfo === service.key}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Typography
                          variant="body2"
                          sx={{mt: 1, color: theme.palette.info.main}}
                        >
                          {service.info}
                        </Typography>
                      </Collapse>
                    </Box>
                  }
                />
                <ListItemSecondaryAction
                  sx={{display: 'flex', alignItems: 'center'}}
                >
                  <Tooltip title="More info">
                    <IconButton
                      size="small"
                      onClick={() => toggleInfo(service.key)}
                      sx={{mr: 1}}
                    >
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <IOSSwitch
                    checked={toggleStates[service.key]}
                    onChange={handleToggleChange(service.key)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              {index < services.length - 1 && <Divider sx={{my: 1}} />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default ServicesSettings
