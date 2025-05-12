import React from 'react'
import {
  Box,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material'
import {
  TaskAlt,
  GitHub,
  Twitter,
  HelpOutline,
  Email,
  Facebook,
  Instagram,
  KeyboardArrowUp,
} from '@mui/icons-material'
import {Link as RouterLink} from 'react-router-dom'

interface FooterLink {
  title: string
  url: string
  icon?: React.ReactNode
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const Footer: React.FC = () => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const footerSections: FooterSection[] = [
    {
      title: 'Nomeda',
      links: [
        {title: 'Home', url: '/Home', icon: <TaskAlt fontSize="small" />},
        {title: 'Dashboard', url: '/dashboard'},
        {title: 'Tasks', url: '/tasks'},
        {title: 'Team', url: '/team'},
      ],
    },
    {
      title: 'Support',
      links: [
        {
          title: 'Help Center',
          url: '/help',
          icon: <HelpOutline fontSize="small" />,
        },
        {
          title: 'Contact Us',
          url: '/contact',
          icon: <Email fontSize="small" />,
        },
        {title: 'Documentation', url: '/docs'},
      ],
    },
    {
      title: 'Legal',
      links: [
        {title: 'Privacy Policy', url: '/privacy'},
        {title: 'Terms of Service', url: '/terms'},
        {title: 'Security', url: '/security'},
      ],
    },
  ]

  const socialLinks = [
    {icon: <GitHub />, url: 'https://github.com/', name: 'GitHub'},
    {icon: <Twitter />, url: 'https://twitter.com/', name: 'Twitter'},
    {icon: <Facebook />, url: 'https://facebook.com/', name: 'Facebook'},
    {icon: <Instagram />, url: 'https://instagram.com/', name: 'Instagram'},
  ]

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: isDark ? 'background.paper' : '#ffffff',
        color: isDark ? 'text.primary' : 'text.primary',
        pt: {xs: 4, md: 6},
        pb: {xs: 4, md: 6},
        width: '100%',
        borderTop: 1,
        borderColor: isDark ? 'divider' : 'grey.200',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 4 : 8}>
          {footerSections.map(section => (
            <Grid item xs={12} sm={6} md={4} key={section.title}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 2,
                }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', alignItems: 'start'}}> 
                {section.links.map(link => (
                  <Button component="li" key={link.title} sx={{mb: 1.5}}>
                    {link.url.startsWith('http') ? (
                      <MuiLink
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: 'text.secondary',
                          transition: 'all 0.2s',
                          '&:hover': {
                            color: 'primary.main',
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        {link.icon &&
                          React.cloneElement(link.icon as React.ReactElement, {
                            sx: {fontSize: '0.9rem'},
                          })}
                        <Typography variant="body2">{link.title}</Typography>
                      </MuiLink>
                    ) : (
                      <RouterLink
                        to={link.url}
                        style={{textDecoration: 'none'}}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            color: 'text.secondary',
                            transition: 'all 0.2s',
                            '&:hover': {
                              color: 'primary.main',
                              transform: 'translateX(4px)',
                            },
                          }}
                        >
                          {link.icon &&
                            React.cloneElement(
                              link.icon as React.ReactElement,
                              {
                                sx: {fontSize: '0.9rem'},
                              },
                            )}
                          <Typography variant="body2">{link.title}</Typography>
                        </Box>
                      </RouterLink>
                    )}
                  </Button>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{my: 4, opacity: isDark ? 0.1 : 0.2}} />

        <Grid
          container
          spacing={2}
          alignItems="center"
          direction={isMedium ? 'column' : 'row'}
        >
          <Grid item xs={12} sm={6}>
            <Box
              sx={{display: 'flex', alignItems: 'center', mb: isMedium ? 2 : 0}}
            >
              <TaskAlt
                sx={{
                  fontSize: 32,
                  color: 'primary.main',
                  mr: 1,
                }}
              />
              <Box>
                <Typography variant="h5" sx={{fontWeight: 700}}>
                  Nomeda
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                  Your productive task manager
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: isMedium ? 'center' : 'flex-end',
            }}
          >
            <Box sx={{display: 'flex', gap: 1}}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  sx={{
                    color: 'text.secondary',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box
          mt={4}
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            © {new Date().getFullYear()} Nomeda Task Hub. All rights reserved.
          </Typography>

          <IconButton
            onClick={scrollToTop}
            size="small"
            sx={{
              position: isMobile ? 'relative' : 'absolute',
              right: isMobile ? 'auto' : 0,
              bgcolor: 'action.selected',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <KeyboardArrowUp fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
