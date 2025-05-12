import {useState} from 'react'
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Breadcrumbs,
  Link,
  Button,
  Grid,
  Drawer,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import {useNavigate} from 'react-router-dom'

export const PrivacyPolicy = () => {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const sections = [
    'Information We Collect',
    'How We Use Your Information',
    'Third-Party Services',
    'Data Security',
    'Your Rights',
    'Contact Us',
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({behavior: 'smooth'})
    }
    setDrawerOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{position: 'fixed', right: 20, bottom: 20, zIndex: 1000}}>
        <Button
          variant="contained"
          color="primary"
          onClick={scrollToTop}
          sx={{
            borderRadius: '50%',
            minWidth: '50px',
            width: '50px',
            height: '50px',
          }}
        >
          <ArrowUpwardIcon />
        </Button>
      </Box>

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
          <Typography color="text.primary">Privacy Policy</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{display: {xs: 'block', md: 'none'}, mb: 2}}>
        <Button
          startIcon={<MenuIcon />}
          onClick={() => setDrawerOpen(true)}
          variant="outlined"
          fullWidth
        >
          Jump to Section
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box sx={{display: {xs: 'none', md: 'block'}}}>
            <Paper sx={{position: 'sticky', top: 20, p: 2}}>
              <Typography variant="h6" gutterBottom>
                Quick Navigation
              </Typography>
              <List dense>
                {sections.map((section, index) => (
                  <ListItem
                    key={section}
                    onClick={() => scrollToSection(`section-${index + 1}`)}
                    sx={{
                      borderLeft: 2,
                      borderColor: 'transparent',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemText primary={`${index + 1}. ${section}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{p: 4, my: 4}}>
            <Typography variant="h3" gutterBottom>
              Privacy Policy
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              <em>Last Updated: {new Date().toLocaleDateString()}</em>
            </Typography>

            <Box id="section-1" my={4}>
              <Typography variant="h4" gutterBottom>
                1. Information We Collect
              </Typography>
              <Typography variant="body1" paragraph>
                Nomeda Task Hub is committed to protecting your privacy. We
                collect and process the following types of information:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Personal Information"
                    secondary="Email address (for account creation), profile information (optional), and authentication data."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Task Data"
                    secondary="Task content, project information, and workspace data (stored locally by default, with optional cloud sync)."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Usage Information"
                    secondary="Anonymous analytics data about how you use our application to improve our services."
                  />
                </ListItem>
              </List>
            </Box>

            <Divider sx={{my: 4}} />

            <Box id="section-2" my={4}>
              <Typography variant="h4" gutterBottom>
                2. How We Use Your Information
              </Typography>
              <Typography variant="body1" paragraph>
                We use your information for the following purposes:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Service Provision"
                    secondary="To provide and maintain our task management services, sync your data across devices, and ensure smooth operation of features."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Service Improvement"
                    secondary="To analyze usage patterns and improve our application's functionality and user experience."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Communication"
                    secondary="To send you important updates about our service, security notifications, and responses to your inquiries."
                  />
                </ListItem>
              </List>
            </Box>

            <Divider sx={{my: 4}} />

            <Box id="section-3" my={4}>
              <Typography variant="h4" gutterBottom>
                3. Third-Party Services
              </Typography>
              <Typography variant="body1" paragraph>
                We carefully select and monitor our third-party service
                providers:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Firebase"
                    secondary="Used for secure authentication and data storage. Subject to Google's privacy policy."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Vercel Analytics"
                    secondary="Collects anonymous usage statistics to help us improve our service. No personal information is shared."
                  />
                </ListItem>
              </List>
              <Typography variant="body1" color="primary" paragraph>
                We never sell your personal data to advertisers or third
                parties.
              </Typography>
            </Box>

            <Divider sx={{my: 4}} />

            <Box id="section-4" my={4}>
              <Typography variant="h4" gutterBottom>
                4. Data Security
              </Typography>
              <Typography variant="body1" paragraph>
                We implement industry-standard security measures to protect your
                data:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Encryption"
                    secondary="All data is encrypted in transit and at rest using industry-standard protocols."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Access Controls"
                    secondary="Strict access controls and authentication mechanisms protect your account."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Regular Audits"
                    secondary="We regularly audit our security measures and update them as needed."
                  />
                </ListItem>
              </List>
            </Box>

            <Divider sx={{my: 4}} />

            <Box id="section-5" my={4}>
              <Typography variant="h4" gutterBottom>
                5. Your Rights
              </Typography>
              <Typography variant="body1" paragraph>
                You have the following rights regarding your data:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Access and Control"
                    secondary="Access, modify, or delete your personal information at any time through your account settings."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Data Portability"
                    secondary="Export your task data in standard formats for use with other services."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Account Deletion"
                    secondary="Delete your account and all associated data via Settings → Delete Account."
                  />
                </ListItem>
              </List>
            </Box>

            <Divider sx={{my: 4}} />

            <Box id="section-6" my={4}>
              <Typography variant="h4" gutterBottom>
                6. Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary="privacy@nomeda.com"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Support"
                    secondary="https://nomeda.com/support"
                  />
                </ListItem>
              </List>
            </Box>

            <Box mt={4}>
              <Typography variant="body2" color="text.secondary" paragraph>
                This privacy policy is regularly updated to reflect changes in
                our practices and services. We encourage you to review this
                policy periodically.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Version: 2.0 - Updated: May 12, 2025
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{width: 250, p: 2}}>
          <Typography variant="h6" gutterBottom>
            Jump to Section
          </Typography>
          <List>
            {sections.map((section, index) => (
              <ListItem
                key={section}
                onClick={() => scrollToSection(`section-${index + 1}`)}
                sx={{cursor: 'pointer'}}
              >
                <ListItemText primary={`${index + 1}. ${section}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Container>
  )
}
