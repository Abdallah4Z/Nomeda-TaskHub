import React from 'react';
import { Box, Container, Grid, Link, Typography, Divider, IconButton } from '@mui/material';
import { TaskAlt, GitHub, Twitter, HelpOutline, Email, Facebook, Instagram } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface FooterLink {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const theme = useTheme();
  
  const footerSections: FooterSection[] = [
    {
      title: 'Nomeda',
      links: [
        { title: 'Features', url: '/features', icon: <TaskAlt fontSize="small" /> },
        { title: 'Pricing', url: '/pricing' },
        { title: 'Roadmap', url: '/roadmap' },
      ],
    },
    {
      title: 'Support',
      links: [
        { title: 'Help Center', url: '/help', icon: <HelpOutline fontSize="small" /> },
        { title: 'Contact Us', url: '/contact', icon: <Email fontSize="small" /> },
        { title: 'API Docs', url: '/docs' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', url: '/privacy' },
        { title: 'Terms of Service', url: '/terms' },
        { title: 'Security', url: '/security' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <GitHub />, url: 'https://github.com/nomeda', name: 'GitHub' },
    { icon: <Twitter />, url: 'https://twitter.com/nomeda', name: 'Twitter' },
    { icon: <Facebook />, url: 'https://facebook.com/nomeda', name: 'Facebook' },
    { icon: <Instagram />, url: 'https://instagram.com/nomeda', name: 'Instagram' },
  ];
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#212121',
        color: theme.palette.primary.contrastText,
        py: 6,
        mt: '10px',
        width: '100vw',
        mb: '-100px',
        opacity: 0.9
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={4} key={section.title}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.links.map((link) => (
                  <li key={link.title} style={{ marginBottom: '0.5rem' }}>
                    <Link
                      href={link.url}
                      color="inherit"
                      underline="hover"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        '&:hover': {
                          color: '#d32f2f',
                        }
                      }}
                    >
                      {link.icon && React.cloneElement(link.icon, { sx: { opacity: 0.7 } })}
                      {link.title}
                    </Link>
                  </li>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
              <TaskAlt sx={{ verticalAlign: 'middle', mr: 1 }} />
              Nomeda
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
              Your productive task manager
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  sx={{ 
                    color: 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
        
        <Box mt={4}>
          <Typography variant="body2" align="center" sx={{ opacity: 1, color: '#d32f2f'}}>
            {'© '}
            {new Date().getFullYear()}
            {' Nomeda Task Hub. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;