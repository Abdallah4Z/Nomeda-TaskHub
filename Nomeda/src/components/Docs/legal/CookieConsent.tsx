import React, {useState, useEffect} from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  Slide,
  FormGroup,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Link,
  Stack,
  IconButton,
  useTheme,
  alpha,
  FormControlLabelProps,
} from '@mui/material'
import CookieIcon from '@mui/icons-material/Cookie'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'
import {useNavigate} from 'react-router-dom'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  functional: boolean
  marketing: boolean
}

export const CookieConsent = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [consent, setConsent] = useState<boolean | null>(null)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true and cannot be changed
    analytics: true,
    functional: true,
    marketing: false,
  })

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent')
    if (savedConsent) {
      setConsent(savedConsent === 'true')
      const savedPreferences = localStorage.getItem('cookiePreferences')
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences))
      }
    } else {
      setConsent(null)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    setConsent(true)
  }

  const handleAcceptAll = () => {
    const allEnabled = {
      ...preferences,
      analytics: true,
      functional: true,
      marketing: true,
    }
    localStorage.setItem('cookieConsent', 'true')
    localStorage.setItem('cookiePreferences', JSON.stringify(allEnabled))
    setPreferences(allEnabled)
    setConsent(true)
    setShowPreferences(false)
  }

  const handleDecline = () => {
    const essentialOnly = {
      ...preferences,
      analytics: false,
      functional: false,
      marketing: false,
    }
    localStorage.setItem('cookieConsent', 'false')
    localStorage.setItem('cookiePreferences', JSON.stringify(essentialOnly))
    setPreferences(essentialOnly)
    setConsent(false)
  }

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Cannot change necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSavePreferences = () => {
    handleAccept()
    setShowPreferences(false)
  }

  if (consent !== null) return null

  return (
    <>
      <Slide direction="up" in={!consent}>
        <Paper
          elevation={6}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.snackbar,
            p: 3,
            background: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(8px)',
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{maxWidth: 1200, margin: '0 auto'}}>
            <Stack
              direction={{xs: 'column', md: 'row'}}
              spacing={2}
              alignItems="center"
            >
              <CookieIcon color="primary" sx={{fontSize: 40}} />
              <Box flex={1}>
                <Typography variant="h6" gutterBottom>
                  We value your privacy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We use cookies to enhance your browsing experience, serve
                  personalized content, and analyze our traffic. Read our{' '}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/privacy')}
                  >
                    Privacy Policy
                  </Link>{' '}
                  to learn more.
                </Typography>
              </Box>
              <Stack direction={{xs: 'column', sm: 'row'}} spacing={1}>
                <Button
                  variant="outlined"
                  onClick={() => setShowPreferences(true)}
                  startIcon={<SettingsIcon />}
                >
                  Preferences
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleDecline}
                >
                  Decline All
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAcceptAll}
                >
                  Accept All
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Slide>

      <Dialog
        open={showPreferences}
        onClose={() => setShowPreferences(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Cookie Preferences
          <IconButton
            aria-label="close"
            onClick={() => setShowPreferences(false)}
            sx={{position: 'absolute', right: 8, top: 8}}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Alert severity="info" sx={{mb: 2}}>
            Configure your cookie preferences below. Some cookies are necessary
            for the website to function and cannot be disabled.
          </Alert>
          <FormGroup>
            {' '}
            <FormControlLabel
              control={<Switch checked={preferences.necessary} disabled />}
              label={
                <Box>
                  <Typography variant="subtitle2">Necessary Cookies</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Required for the website to function properly. Cannot be
                    disabled.
                  </Typography>
                </Box>
              }
              sx={{alignItems: 'start'}}
            />{' '}
            as FormControlLabelProps{' '}
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.analytics}
                  onChange={() => handlePreferenceChange('analytics')}
                />
              }
              label={
                <Box>
                  <Typography variant="subtitle2">Analytics Cookies</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Help us understand how visitors interact with our website.
                  </Typography>
                </Box>
              }
              sx={{alignItems: 'start'}}
            />{' '}
            as FormControlLabelProps{' '}
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.functional}
                  onChange={() => handlePreferenceChange('functional')}
                />
              }
              label={
                <Box>
                  <Typography variant="subtitle2">
                    Functional Cookies
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Enable enhanced functionality and personalization.
                  </Typography>
                </Box>
              }
              sx={{alignItems: 'start'}}
            />{' '}
            as FormControlLabelProps
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.marketing}
                  onChange={() => handlePreferenceChange('marketing')}
                />
              }
              label={
                <Box>
                  <Typography variant="subtitle2">Marketing Cookies</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Used for targeted advertising and marketing purposes.
                  </Typography>
                </Box>
              }
            />
          </FormGroup>
        </DialogContent>
        <DialogActions sx={{p: 2}}>
          <Button onClick={() => setShowPreferences(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDecline} color="inherit">
            Decline All
          </Button>
          <Button onClick={handleAcceptAll} color="primary">
            Accept All
          </Button>
          <Button
            onClick={handleSavePreferences}
            variant="contained"
            color="primary"
          >
            Save Preferences
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
