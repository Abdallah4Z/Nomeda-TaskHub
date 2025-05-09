import {Link} from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {Home as HomeIcon, Support as SupportIcon} from '@mui/icons-material'

type ErrorLayoutProps = {
  code: number
  title: string
  message: string
  children?: React.ReactNode
}

export const ErrorLayout = ({
  code,
  title,
  message,
  children,
}: ErrorLayoutProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: {xs: 2, sm: 4},
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            p: {xs: 3, sm: 6},
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: theme.shadows[2],
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: {xs: '4rem', sm: '6rem'},
              fontWeight: 700,
              color: theme.palette.error.main,
              mb: 2,
            }}
          >
            {code}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontSize: {xs: '1.5rem', sm: '2rem'},
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: theme.palette.text.secondary,
              fontSize: {xs: '1rem', sm: '1.1rem'},
            }}
          >
            {message}
          </Typography>

          {children}

          <Stack
            direction={{xs: 'column', sm: 'row'}}
            spacing={2}
            justifyContent="center"
            sx={{mt: 4}}
          >
            <Button
              component={Link}
              to="/"
              variant="contained"
              size={isMobile ? 'large' : 'medium'}
              startIcon={<HomeIcon />}
              sx={{
                minWidth: {xs: '100%', sm: 200},
              }}
            >
              Return Home
            </Button>
            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              size={isMobile ? 'large' : 'medium'}
              startIcon={<SupportIcon />}
              sx={{
                minWidth: {xs: '100%', sm: 200},
              }}
            >
              Contact Support
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
