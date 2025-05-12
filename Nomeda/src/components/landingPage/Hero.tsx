import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {styled} from '@mui/material/styles'
import {useNavigate} from 'react-router-dom'
import dsi from '../../assets/dashboard.png'

const StyledBox = styled('div')(({theme}) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${dsi})`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 800,
    width: '100%',
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(1, 100.00%, 25.10%, 0.20)',
    backgroundImage: `url(${dsi})`,
    outlineColor: 'hsla(0, 20.00%, 42.20%, 0.10)',
    borderColor: theme.palette.grey[700],
  }),
}))

export default function Hero() {
  const navigate = useNavigate()

  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        backgroundRepeat: 'no-repeat',
        background: theme =>
          theme.palette.mode === 'light'
            ? 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 217, 217, 0.3), transparent)'
            : 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 0, 0, 0.15), transparent)',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: {xs: 14, sm: 20},
          pb: {xs: 8, sm: 12},
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{alignItems: 'center', width: {xs: '100%', sm: '70%'}}}
        >
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: {xs: 'column', sm: 'row'},
              alignItems: 'center',
              textAlign: 'center',
              fontSize: {xs: '2.5rem', sm: '3.5rem', md: '4rem'},
              background: theme =>
                theme.palette.mode === 'light'
                  ? 'linear-gradient(90deg, #2196F3 0%, #F50057 100%)'
                  : 'linear-gradient(90deg, #90CAF9 0%, #F48FB1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              mb: 2,
            }}
          >
            Nomeda Task-Hub
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: {xs: '1.5rem', sm: '2rem'},
              textAlign: 'center',
              fontWeight: 500,
              mb: 2,
            }}
          >
            Revolutionize Your Task Management
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              width: {sm: '100%', md: '80%'},
              fontSize: {xs: '1rem', sm: '1.125rem'},
              lineHeight: 1.6,
              mb: 4,
              opacity: 0.8,
            }}
          >
            Experience seamless collaboration, intelligent task organization,
            and AI-powered assistance. Boost your productivity with our
            cutting-edge task management solution designed for modern teams.
          </Typography>
          <Stack
            direction={{xs: 'column', sm: 'row'}}
            alignItems="center"
            spacing={2}
            useFlexGap
            sx={{width: '100%', maxWidth: '400px', mt: 4}}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                py: 1.5,
                px: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
              }}
              onClick={() => navigate('/signup')}
            >
              Get Started - It's Free
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
              sx={{
                py: 1.5,
                px: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
              }}
              onClick={() => {
                const features = document.getElementById('features')
                features?.scrollIntoView({behavior: 'smooth'})
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Stack>
        <StyledBox />
      </Container>
    </Box>
  )
}
