import React from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Alert,
  Breadcrumbs,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  alpha,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GavelIcon from '@mui/icons-material/Gavel'

export const TermsOfService = () => {
  const navigate = useNavigate()
  const currentDate = new Date()
  const effectiveDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const sections = [
    {
      title: '1. Agreement to Terms',
      content: [
        {
          subtitle: '1.1 Acceptance',
          text: 'By accessing or using Nomeda Task Hub, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you disagree with any part of these terms, you may not use our service.',
        },
        {
          subtitle: '1.2 Eligibility',
          text: 'You must be at least 13 years old to use this service. If you are under 18, you must have parental consent to use this service.',
        },
      ],
    },
    {
      title: '2. User Accounts',
      content: [
        {
          subtitle: '2.1 Registration',
          text: 'You must provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials.',
        },
        {
          subtitle: '2.2 Account Security',
          text: 'You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use or security breach.',
        },
      ],
    },
    {
      title: '3. Acceptable Use',
      content: [
        {
          subtitle: '3.1 Permitted Use',
          text: 'You agree to use the service only for lawful purposes and in accordance with these Terms. You will not use the service for any illegal or unauthorized purpose.',
        },
        {
          subtitle: '3.2 Prohibited Activities',
          text: 'You must not: (a) engage in any harmful or malicious activities, (b) upload illegal content, (c) attempt to gain unauthorized access, (d) interfere with service operations.',
        },
      ],
    },
    {
      title: '4. Intellectual Property',
      content: [
        {
          subtitle: '4.1 Ownership',
          text: 'All content, features, and functionality of Nomeda Task Hub are owned by us and protected by international copyright, trademark, and other intellectual property laws.',
        },
        {
          subtitle: '4.2 User Content',
          text: 'You retain ownership of your content but grant us a license to use, modify, and display it in connection with the service.',
        },
      ],
    },
    {
      title: '5. Liability and Disclaimers',
      content: [
        {
          subtitle: '5.1 Service Availability',
          text: "We strive for 99.9% uptime but cannot guarantee uninterrupted access. The service is provided 'as is' without warranties of any kind.",
        },
        {
          subtitle: '5.2 Limitation of Liability',
          text: 'We are not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.',
        },
      ],
    },
    {
      title: '6. Changes and Termination',
      content: [
        {
          subtitle: '6.1 Modifications',
          text: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use constitutes acceptance of changes.',
        },
        {
          subtitle: '6.2 Account Termination',
          text: 'We may suspend or terminate your account for violations of these terms, illegal activities, or extended periods of inactivity.',
        },
      ],
    },
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
          <Typography color="text.primary">Terms of Service</Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{p: 4, my: 4}}>
        <Box sx={{display: 'flex', alignItems: 'center', mb: 4}}>
          <GavelIcon color="primary" sx={{fontSize: 40, mr: 2}} />
          <Box>
            <Typography variant="h3" gutterBottom>
              Terms of Service
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Effective: {effectiveDate}
            </Typography>
          </Box>
        </Box>

        <Alert severity="info" sx={{mb: 4}}>
          Please read these terms carefully before using Nomeda Task Hub. By
          using our service, you agree to be bound by these terms and our
          Privacy Policy.
        </Alert>

        {sections.map((section, index) => (
          <Accordion key={index} defaultExpanded={index === 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: theme =>
                  alpha(theme.palette.primary.main, 0.05),
              }}
            >
              <Typography variant="h6">{section.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {section.content.map((item, i) => (
                <Box key={i} sx={{mb: 2}}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {item.subtitle}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

        <Box sx={{mt: 4}}>
          <Divider sx={{mb: 2}} />
          <Typography variant="body2" color="text.secondary">
            By using Nomeda Task Hub, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service. For
            questions about these terms, please contact us at
            legal@nomeda-task-hub.example
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{mt: 1, display: 'block'}}
          >
            Last updated: {effectiveDate}
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
