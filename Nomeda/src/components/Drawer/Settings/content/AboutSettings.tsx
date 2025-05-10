import React, {useState} from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  Paper,
  Box,
  useTheme,
  Link,
  Chip,
  Stack,
} from '@mui/material'
import DropDown from './DropDown'
import IOSSwitchComponent from '../../../IOS'
import InfoIcon from '@mui/icons-material/Info'
import TimelineIcon from '@mui/icons-material/Timeline'

const AboutSettings: React.FC = () => {
  const theme = useTheme()
  const [version, setVersion] = useState<string>('V.1')
  const [toggleStates, setToggleStates] = useState({
    autoUpdate: false,
    telemetry: false,
    TimeZone: false,
  })

  const handleVersionChange = (event: any) => {
    setVersion(event.target.value)
  }

  const versionMenuItems = [
    {value: 'V.1', label: 'Version 1.0.0 (Stable)'},
    {value: 'V.2', label: 'Version 1.1.0 (Beta)'},
    {value: 'V.3', label: 'Version 1.2.0 (Alpha)'},
    {value: 'V.4', label: 'Version 1.3.0 (Development)'},
  ]

  const handleToggleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setToggleStates({
        ...toggleStates,
        [key]: event.target.checked,
      })
    }

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontSize: '3vh',
          fontWeight: 'bold',
          paddingLeft: 2,
          marginBottom: 2,
        }}
      >
        About Nomeda Task Manager
      </Typography>
      <Divider />

      <Paper
        elevation={0}
        sx={{
          bgcolor:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.02)',
          borderRadius: 2,
          p: 2,
          mt: 2,
          mb: 3,
        }}
      >
        <Stack spacing={1}>
          <Typography variant="body1">
            Nomeda Task Manager is a real-time collaborative task management
            platform designed to enhance team productivity through AI-powered
            features.
          </Typography>

          <Stack direction="row" spacing={1} sx={{mt: 1}}>
            <Chip
              icon={<InfoIcon sx={{fontSize: 16}} />}
              label={version === 'V.1' ? 'Stable Release' : 'Preview Release'}
              color={version === 'V.1' ? 'success' : 'warning'}
              size="small"
            />
            <Chip
              icon={<TimelineIcon sx={{fontSize: 16}} />}
              label="Active Development"
              color="info"
              size="small"
            />
          </Stack>
        </Stack>
      </Paper>

      <Typography
        variant="h6"
        sx={{
          fontSize: '2.5vh',
          fontWeight: 'bold',
          paddingLeft: 2,
          marginBottom: 2,
        }}
      >
        Version Control
      </Typography>
      <Divider />

      <List>
        <ListItem>
          <ListItemText
            primary="Application Version"
            secondary="Select the version of Nomeda you want to use"
          />
          <DropDown
            themeSetting={version}
            handleThemeChange={handleVersionChange}
            menuItems={versionMenuItems}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Automatic Updates"
            secondary="Keep Nomeda up to date automatically"
          />
          <ListItemSecondaryAction>
            <IOSSwitchComponent
              edge="end"
              checked={toggleStates.autoUpdate}
              onChange={handleToggleChange('autoUpdate')}
            />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Usage Statistics"
            secondary="Help improve Nomeda by sending anonymous usage data"
          />
          <ListItemSecondaryAction>
            <IOSSwitchComponent
              edge="end"
              checked={toggleStates.telemetry}
              onChange={handleToggleChange('telemetry')}
            />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Time Zone"
            secondary="Sync reminders and notifications with your time zone"
          />
          <ListItemSecondaryAction>
            <IOSSwitchComponent
              edge="end"
              checked={toggleStates.TimeZone}
              onChange={handleToggleChange('TimeZone')}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Typography
        variant="h6"
        sx={{
          fontSize: '2.5vh',
          fontWeight: 'bold',
          paddingLeft: 2,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        Additional Information
      </Typography>
      <Divider />

      <Paper
        elevation={0}
        sx={{
          bgcolor:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.02)',
          borderRadius: 2,
          p: 2,
          mt: 2,
        }}
      >
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" color="primary">
              License
            </Typography>
            <Typography variant="body2">
              © 2024 Nomeda. All rights reserved.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="primary">
              Support
            </Typography>
            <Typography variant="body2">
              For support, visit our{' '}
              <Link href="#" color="primary">
                Help Center
              </Link>{' '}
              or contact{' '}
              <Link href="#" color="primary">
                support@nomeda.com
              </Link>
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="primary">
              Legal
            </Typography>
            <Stack direction="row" spacing={1}>
              <Link href="#" color="primary" variant="body2">
                Privacy Policy
              </Link>
              <Typography variant="body2">•</Typography>
              <Link href="#" color="primary" variant="body2">
                Terms of Service
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default AboutSettings
