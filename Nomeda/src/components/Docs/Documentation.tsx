import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  Breadcrumbs,
  Link,
  Divider,
  Stack,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SecurityIcon from '@mui/icons-material/Security'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import GavelIcon from '@mui/icons-material/Gavel'
import CookieIcon from '@mui/icons-material/Cookie'
import HelpIcon from '@mui/icons-material/Help'
import SchoolIcon from '@mui/icons-material/School'
import UpdateIcon from '@mui/icons-material/Update'
import BugReportIcon from '@mui/icons-material/BugReport'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'

interface DocSection {
  title: string
  description: string
  path: string
  icon: React.ReactNode
  category: 'Legal' | 'Help' | 'Guides'
  tags?: string[]
}

const documentation: DocSection[] = [
  {
    title: 'Privacy Policy',
    description:
      'Learn how we collect, use, and protect your personal information and data.',
    path: '/privacy',
    icon: <PrivacyTipIcon sx={{fontSize: 40}} color="primary" />,
    category: 'Legal',
    tags: ['Privacy', 'Data Protection', 'GDPR'],
  },
  {
    title: 'Terms of Service',
    description:
      'Understand our terms and conditions for using Nomeda Task Hub.',
    path: '/terms',
    icon: <GavelIcon sx={{fontSize: 40}} color="primary" />,
    category: 'Legal',
    tags: ['Terms', 'Conditions', 'Rules'],
  },
  {
    title: 'Security Information',
    description:
      'Details about our security practices and how we protect your data.',
    path: '/security',
    icon: <SecurityIcon sx={{fontSize: 40}} color="primary" />,
    category: 'Legal',
    tags: ['Security', 'Protection', 'Encryption'],
  },
  {
    title: 'Cookie Policy',
    description:
      'Information about how we use cookies and similar technologies.',
    path: '/cookies',
    icon: <CookieIcon sx={{fontSize: 40}} color="primary" />,
    category: 'Legal',
    tags: ['Cookies', 'Tracking', 'Privacy'],
  },
  {
    title: 'Help Center',
    description:
      'Find answers to common questions and learn how to use our features.',
    path: '/help',
    icon: <HelpIcon sx={{fontSize: 40}} color="primary" />,
    category: 'Help',
    tags: ['Support', 'FAQ', 'Guides'],
  },
  {
    title: 'Getting Started',
    description:
      'A comprehensive guide to help you get started with Nomeda Task Hub.',
    path: '/getting-started',
    icon: <SchoolIcon sx={{fontSize: 40}} color="primary" />,
    category: 'Guides',
    tags: ['Tutorial', 'Onboarding', 'Basics'],
  },
  {
    title: 'Updates & Changes',
    description:
      'Stay informed about the latest updates and changes to our platform.',
    path: '/updates',
    icon: <UpdateIcon sx={{fontSize: 40}} color="primary" />,
    category: 'Help',
    tags: ['Updates', 'Changelog', 'Features'],
  },
  {
    title: 'Bug Reports',
    description:
      'Learn how to report bugs and track the status of your reports.',
    path: '/bug-reports',
    icon: <BugReportIcon sx={{fontSize: 40}} color="primary" />,
    category: 'Help',
    tags: ['Bugs', 'Issues', 'Support'],
  },
]

export const Documentation = () => {
  const navigate = useNavigate()
  const categories = Array.from(new Set(documentation.map(doc => doc.category)))
  const [searchQuery, setSearchQuery] = React.useState('')

  const filteredDocs = documentation.filter(doc => {
    const searchLower = searchQuery.toLowerCase()
    return (
      doc.title.toLowerCase().includes(searchLower) ||
      doc.description.toLowerCase().includes(searchLower) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    )
  })

  const groupedDocs = categories.map(category => ({
    category,
    docs: filteredDocs.filter(doc => doc.category === category),
  }))

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
          <Typography color="text.primary">Documentation</Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{p: 4, mb: 4}}>
        <Box sx={{display: 'flex', alignItems: 'center', mb: 4}}>
          <MenuBookIcon color="primary" sx={{fontSize: 40, mr: 2}} />
          <Typography variant="h3">Documentation</Typography>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          sx={{mb: 4}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {groupedDocs.map(
          ({category, docs}) =>
            docs.length > 0 && (
              <Box key={category} sx={{mb: 6}}>
                <Typography variant="h4" gutterBottom sx={{mb: 3}}>
                  {category}
                </Typography>
                <Grid container spacing={3}>
                  {docs.map((doc, index) => (
                    <Grid key={index} component="div" item xs={12} md={6}>
                      <Card>
                        <CardActionArea onClick={() => navigate(doc.path)}>
                          <CardContent>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                mb: 2,
                              }}
                            >
                              {doc.icon}
                              <Box sx={{ml: 2}}>
                                <Typography variant="h5" gutterBottom>
                                  {doc.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {doc.description}
                                </Typography>
                              </Box>
                            </Box>
                            {doc.tags && (
                              <Stack direction="row" spacing={1} sx={{mt: 2}}>
                                {doc.tags.map((tag, i) => (
                                  <Chip
                                    key={i}
                                    label={tag}
                                    size="small"
                                    variant="outlined"
                                  />
                                ))}
                              </Stack>
                            )}
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                {category !== categories[categories.length - 1] && (
                  <Divider sx={{my: 4}} />
                )}
              </Box>
            ),
        )}
      </Paper>
    </Container>
  )
}
