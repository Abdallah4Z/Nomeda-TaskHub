import React from 'react'
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  useTheme,
} from '@mui/material'
import {Email as EmailIcon} from '@mui/icons-material'
import {User} from '../../scripts/types'

interface ContactInformationProps {
  isEditing: boolean
  formData: Partial<User>
  handleInputChange: (
    field: string,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ContactInformation: React.FC<ContactInformationProps> = ({
  isEditing,
  formData,
  handleInputChange,
}) => {
  const theme = useTheme()

  return (
    <Grid item component="div" xs={12} md={6}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 'medium',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            width: 4,
            height: 24,
            backgroundColor: theme.palette.primary.main,
            marginRight: 2,
            borderRadius: 2,
          },
        }}
      >
        Contact Information
      </Typography>
      <List>
        <ListItem sx={{px: 0}}>
          <EmailIcon
            sx={{
              mr: 2,
              color: 'primary.main',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
          <ListItemText
            primary={
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
            }
            secondary={
              isEditing ? (
                <TextField
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  variant="standard"
                  fullWidth
                  placeholder="Your email"
                />
              ) : (
                <Typography variant="body1">{formData.email}</Typography>
              )
            }
          />
        </ListItem>
        <ListItem sx={{px: 0}}>
          <EmailIcon
            sx={{
              mr: 2,
              color: 'primary.main',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
          <ListItemText
            primary={
              <Typography variant="subtitle2" color="text.secondary">
                Phone
              </Typography>
            }
            secondary={
              isEditing ? (
                <TextField
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  variant="standard"
                  fullWidth
                  placeholder="Your phone number"
                />
              ) : (
                <Typography variant="body1">
                  {formData.phone || 'Not provided'}
                </Typography>
              )
            }
          />
        </ListItem>
      </List>
    </Grid>
  )
}

export default ContactInformation
