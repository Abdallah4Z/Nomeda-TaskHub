import React from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Button,
  Breadcrumbs,
  Link,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import SecurityIcon from '@mui/icons-material/Security'
import LockIcon from '@mui/icons-material/Lock'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import ShieldIcon from '@mui/icons-material/Shield'
import HttpsIcon from '@mui/icons-material/Https'
import StorageIcon from '@mui/icons-material/Storage'
import BugReportIcon from '@mui/icons-material/BugReport'
import UpdateIcon from '@mui/icons-material/Update'

export const SecurityInfo = () => {
  const navigate = useNavigate()

  const securityFeatures = [
    {
      icon: <LockIcon color="primary" />,
      title: 'End-to-End Encryption',
      description:
        'All data in transit is encrypted using TLS 1.3. Local data is protected using secure browser storage mechanisms including IndexedDB with built-in encryption.',
    },
    {
      icon: <VerifiedUserIcon color="primary" />,
      title: 'Authentication & Authorization',
      description:
        'Multi-factor authentication support, secure session management, and role-based access control to protect your account.',
    },
    {
      icon: <ShieldIcon color="primary" />,
      title: 'Data Protection',
      description:
        'Regular security audits, automated vulnerability scanning, and strict data access controls to keep your information safe.',
    },
  ]

  const bestPractices = [
    'Regular security updates and patches',
    'Secure password hashing using bcrypt',
    'Rate limiting to prevent brute force attacks',
    'CSRF token protection',
    'XSS prevention measures',
    'Input validation and sanitization',
  ]

  return (
    <Container maxWidth="lg">
      <Box sx={{mb: 3, mt: 2}}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate('/')}
            sx={{display: 'flex', alignItems: 'center'}}
          >
            <HomeIcon sx={{mr: 0.5}} fontSize="inherit" />
            Home
          </Link>
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate('/docs')}
          >
            Documentation
          </Link>
          <Typography color="text.primary">Security</Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{p: 4, mb: 4}}>
        <Box sx={{display: 'flex', alignItems: 'center', mb: 4}}>
          <SecurityIcon color="primary" sx={{fontSize: 40, mr: 2}} />
          <Typography variant="h3" component="h1">
            Security Practices
          </Typography>
        </Box>
        <Alert severity="info" sx={{mb: 4}}>
          At Nomeda Task Hub, your security is our top priority. We implement
          industry-standard security measures and follow best practices to
          protect your data.
        </Alert>{' '}
        <Grid container spacing={4}>
          {securityFeatures.map((feature, index) => (
            <Grid component="div" item xs={12} md={4} key={index}>
              <Card sx={{height: '100%'}}>
                <CardContent>
                  <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                    {feature.icon}
                    <Typography variant="h6" sx={{ml: 1}}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{my: 4}} />
        <Box sx={{mb: 4}}>
          <Typography variant="h4" gutterBottom>
            Technical Security Measures
          </Typography>
          <Grid container spacing={3}>
            {' '}
            <Grid component="div" item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                    <HttpsIcon color="primary" />
                    <Typography variant="h6" sx={{ml: 1}}>
                      Data Transit Security
                    </Typography>
                  </Box>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="TLS 1.3 Encryption"
                        secondary="Latest security protocols for data transmission"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="HTTPS Only"
                        secondary="Secure communication enforced across all endpoints"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid component="div" item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                    <StorageIcon color="primary" />
                    <Typography variant="h6" sx={{ml: 1}}>
                      Data Storage Security
                    </Typography>
                  </Box>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Encrypted Storage"
                        secondary="Data encrypted at rest using industry standards"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Secure Browser Storage"
                        secondary="Protected local storage with encryption"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{mb: 4}}>
          <Typography variant="h4" gutterBottom>
            Security Best Practices
          </Typography>
          <Grid container spacing={2}>
            {bestPractices.map((practice, index) => (
              <Grid component="div" item xs={12} sm={6} md={4} key={index}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <UpdateIcon color="primary" sx={{mr: 1}} />
                  <Typography variant="body1">{practice}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Divider sx={{my: 4}} />
        <Box>
          <Typography variant="h4" gutterBottom>
            Report Security Issues
          </Typography>
          <Card sx={{bgcolor: 'primary.light', color: 'primary.contrastText'}}>
            <CardContent>
              <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                <BugReportIcon sx={{mr: 1}} />
                <Typography variant="h6">Responsible Disclosure</Typography>
              </Box>
              <Typography paragraph>
                If you've discovered a security vulnerability, please report it
                responsibly by emailing our security team at:
              </Typography>
              <Typography
                variant="h6"
                component="code"
                sx={{display: 'block', mb: 2}}
              >
                security@nomeda-task-hub.example
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                href="mailto:security@nomeda-task-hub.example"
                startIcon={<BugReportIcon />}
              >
                Report Vulnerability
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Container>
  )
}
