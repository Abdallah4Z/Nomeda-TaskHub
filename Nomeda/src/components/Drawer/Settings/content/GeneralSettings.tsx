import React, {useState, useContext, useEffect, useCallback} from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  useTheme,
} from '@mui/material'
import IOSSwitchComponent from '../../../IOS'
import DropDown from './DropDown'
import {ColorModeContext} from '../../../Layout/MainLayout'

interface ToggleStates {
  startWeekOnMonday: boolean
  TimeZone: boolean
  enableNotifications: boolean
}

const GeneralSettings: React.FC = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  // Theme settings
  const [themeSetting, setThemeSetting] = useState<string>(() => {
    return localStorage.getItem('theme-mode') || 'system'
  })

  // Language settings
  const [langSetting, setLangSetting] = useState<string>(() => {
    return (
      localStorage.getItem('app-language') ||
      navigator.language.split('-')[0] ||
      'en'
    )
  })

  // Toggle states
  const [toggleStates, setToggleStates] = useState<ToggleStates>(() => {
    const saved = localStorage.getItem('app-settings')
    return saved
      ? JSON.parse(saved)
      : {
          startWeekOnMonday: false,
          TimeZone: false,
          enableNotifications: false,
        }
  })

  const handleThemeSystem = useCallback(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (theme.palette.mode !== 'dark') {
        colorMode.toggleColorMode()
      }
    } else {
      if (theme.palette.mode !== 'light') {
        colorMode.toggleColorMode()
      }
    }
  }, [theme.palette.mode, colorMode])

  // Theme effect
  useEffect(() => {
    if (themeSetting === 'system') {
      handleThemeSystem()

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => handleThemeSystem()

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      const shouldBeDark = themeSetting === 'dark'
      if (
        (shouldBeDark && theme.palette.mode !== 'dark') ||
        (!shouldBeDark && theme.palette.mode !== 'light')
      ) {
        colorMode.toggleColorMode()
      }
    }
  }, [themeSetting, theme.palette.mode, colorMode, handleThemeSystem])

  // Language effect
  useEffect(() => {
    document.documentElement.lang = langSetting
  }, [langSetting])

  // Save toggle states
  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(toggleStates))
  }, [toggleStates])

  const handleThemeChange = (event: React.ChangeEvent<{value: unknown}>) => {
    const selectedMode = event.target.value as string
    setThemeSetting(selectedMode)
    localStorage.setItem('theme-mode', selectedMode)
  }

  const handleLangChange = (event: React.ChangeEvent<{value: unknown}>) => {
    const newLang = event.target.value as string
    setLangSetting(newLang)
    localStorage.setItem('app-language', newLang)
  }

  const handleToggleChange =
    (key: keyof ToggleStates) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setToggleStates(prev => ({
        ...prev,
        [key]: event.target.checked,
      }))
    }

  const themeMenuItems = [
    {value: 'system', label: 'Use system setting'},
    {value: 'light', label: 'Light'},
    {value: 'dark', label: 'Dark'},
  ]

  const themeLangItems = [
    {value: 'en', label: 'English'},
    {value: 'ar', label: 'Arabic'},
    {value: 'es', label: 'Spanish'},
  ]

  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          fontSize: '3vh',
          fontWeight: 'bold',
          paddingLeft: 2,
          marginBottom: 2,
        }}
      >
        Preferences
      </Typography>

      <Divider variant="middle" />

      <List>
        <ListItem>
          <ListItemText
            primary="Appearance"
            secondary="Choose the appearance of the website"
          />
          <DropDown
            themeSetting={themeSetting}
            handleThemeChange={handleThemeChange}
            menuItems={themeMenuItems}
          />
        </ListItem>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            paddingLeft: 2,
            marginTop: 6,
            marginBottom: 2,
            fontSize: '3vh',
          }}
        >
          Language & Time
        </Typography>

        <Divider variant="middle" />

        <ListItem>
          <ListItemText
            primary="Language"
            secondary="Choose the language of the website"
          />
          <DropDown
            themeSetting={langSetting}
            handleThemeChange={handleLangChange}
            menuItems={themeLangItems}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Start Week On Monday"
            secondary="Make your calendar start on Monday instead of Sunday"
          />
          <ListItemSecondaryAction>
            <IOSSwitchComponent
              edge="end"
              checked={toggleStates.startWeekOnMonday}
              onChange={handleToggleChange('startWeekOnMonday')}
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
    </div>
  )
}

export default GeneralSettings
