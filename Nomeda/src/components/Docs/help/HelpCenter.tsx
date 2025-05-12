import {useState} from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Grid,
  Chip,
  Breadcrumbs,
  Link,
  Stack,
  Button,
  Card,
  CardContent,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import AddTaskIcon from '@mui/icons-material/AddTask'
import SyncIcon from '@mui/icons-material/Sync'
import KeyboardIcon from '@mui/icons-material/Keyboard'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpIcon from '@mui/icons-material/Help'
import EmailIcon from '@mui/icons-material/Email'

interface HelpTopic {
  title: string
  icon: React.ReactNode
  content: {
    description: string
    steps?: string[]
    tips?: string[]
    relatedTopics?: string[]
  }
  category: string
}

const helpTopics: HelpTopic[] = [
  {
    title: 'Creating Your First Task',
    icon: <AddTaskIcon color="primary" />,
    category: 'Getting Started',
    content: {
      description: 'Learn how to create and manage tasks in Nomeda Task Hub.',
      steps: [
        'Navigate to the Tasks page using the sidebar',
        "Click the '+' button in the top-right corner",
        'Fill in the task details (title, description, due date)',
        'Select a priority level and category',
        "Click 'Save' to create your task",
      ],
      tips: [
        "Use keyboard shortcut 'T' to quickly create a new task",
        'You can drag tasks to reorder them',
        'Right-click a task for more options',
      ],
      relatedTopics: ['Task Categories', 'Task Priority Levels'],
    },
  },
  {
    title: 'Cloud Synchronization',
    icon: <SyncIcon color="primary" />,
    category: 'Account & Sync',
    content: {
      description: 'Keep your tasks synchronized across all your devices.',
      steps: [
        'Sign in with your Google or GitHub account',
        'Enable cloud sync in settings',
        'Your tasks will automatically sync across devices',
      ],
      tips: [
        'Enable offline mode for access without internet',
        'Check sync status in the account menu',
        'Manual sync available in settings',
      ],
    },
  },
  {
    title: 'Keyboard Shortcuts',
    icon: <KeyboardIcon color="primary" />,
    category: 'Productivity',
    content: {
      description: 'Master these shortcuts to boost your productivity.',
      steps: [
        'Ctrl+K / Cmd+K - Open command palette',
        'T - New task',
        '/ - Search',
        'Esc - Close modals',
        'Ctrl+S / Cmd+S - Save changes',
      ],
    },
  },
  {
    title: 'Dashboard Overview',
    icon: <DashboardIcon color="primary" />,
    category: 'Getting Started',
    content: {
      description: 'Understanding your dashboard and its features.',
      steps: [
        'View task statistics and progress',
        'Check upcoming deadlines',
        'Monitor team activity',
        'Access quick actions',
      ],
    },
  },
  {
    title: 'Account Management',
    icon: <PersonIcon color="primary" />,
    category: 'Account & Sync',
    content: {
      description: 'Manage your account settings and preferences.',
      steps: [
        'Update profile information',
        'Change password',
        'Manage notification preferences',
        'Configure privacy settings',
      ],
    },
  },
  {
    title: 'Customizing Settings',
    icon: <SettingsIcon color="primary" />,
    category: 'Customization',
    content: {
      description: 'Personalize your Nomeda Task Hub experience.',
      steps: [
        'Change theme preferences',
        'Set default views',
        'Configure notifications',
        'Customize task categories',
      ],
    },
  },
]

export const HelpCenter = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(
    new Set(helpTopics.map(topic => topic.category)),
  )

  const filteredTopics = helpTopics.filter(topic => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.content.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    const matchesCategory =
      !selectedCategory || topic.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Container maxWidth="lg" sx={{minWidth: '80vw'}}>
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
          <Typography color="text.primary">Help Center</Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{p: 4, mb: 4}}>
        <Box sx={{display: 'flex', alignItems: 'center', mb: 4}}>
          <HelpIcon color="primary" sx={{fontSize: 40, mr: 2}} />
          <Typography variant="h3">Help Center</Typography>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search help topics..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{mb: 4}}
        />

        <Stack direction="row" spacing={1} sx={{mb: 4}}>
          {categories.map(category => (
            <Chip
              key={category}
              label={category}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category,
                )
              }
              color={selectedCategory === category ? 'primary' : 'default'}
              sx={{cursor: 'pointer'}}
            />
          ))}
        </Stack>

        <Grid container spacing={3}>
          {filteredTopics.map((topic, index) => (
            <Grid component="div" item xs={12} key={index}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: theme => theme.palette.action.hover,
                  }}
                >
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    {topic.icon}
                    <Typography variant="h6" sx={{ml: 2}}>
                      {topic.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ml: 2}}>
                  <Typography paragraph>{topic.content.description}</Typography>

                  {topic.content.steps && (
                    <>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        gutterBottom
                      >
                        Steps:
                      </Typography>
                      <Box component="ol" sx={{mt: 1, mb: 2}}>
                        {topic.content.steps.map((step, i) => (
                          <li key={i}>
                            <Typography>{step}</Typography>
                          </li>
                        ))}
                      </Box>
                    </>
                  )}

                  {topic.content.tips && (
                    <>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        gutterBottom
                      >
                        Pro Tips:
                      </Typography>
                      <Box component="ul" sx={{mt: 1, mb: 2}}>
                        {topic.content.tips.map((tip, i) => (
                          <li key={i}>
                            <Typography>{tip}</Typography>
                          </li>
                        ))}
                      </Box>
                    </>
                  )}

                  {topic.content.relatedTopics && (
                    <Box sx={{mt: 2}}>
                      <Typography variant="subtitle2" gutterBottom>
                        Related Topics:
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {topic.content.relatedTopics.map((relatedTopic, i) => (
                          <Chip key={i} label={relatedTopic} size="small" />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>

        <Box sx={{mt: 4}}>
          <Card>
            <CardContent>
              <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                <EmailIcon color="primary" sx={{mr: 2}} />
                <Typography variant="h6">Still Need Help?</Typography>
              </Box>
              <Typography paragraph>
                Can't find what you're looking for? Our support team is here to
                help!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EmailIcon />}
                onClick={() => navigate('/contact')}
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Container>
  )
}
