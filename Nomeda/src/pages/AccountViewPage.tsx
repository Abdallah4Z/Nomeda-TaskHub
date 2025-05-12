import React, {useState} from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  useTheme,
} from '@mui/material'
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material'
import MainLayout from '../components/Layout/MainLayout'
import {useAuth} from '../hooks/useAuth'
import ProfileSection from '../components/account/ProfileSection'
import ContactInformation from '../components/account/ContactInformation'
import PasswordSection from '../components/account/PasswordSection'
import SocialAccounts from '../components/account/SocialAccounts'
import DangerZone from '../components/account/DangerZone'
import {User} from '../scripts/types'

interface UserFormData extends Partial<User> {
  currentPassword?: string
  newPassword?: string
}

const AccountViewPage: React.FC = () => {
  const theme = useTheme()
  const {user, updateUser, uploadProfilePhoto} = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [formData, setFormData] = useState<UserFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    facebook: user?.facebook || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    currentPassword: '',
    newPassword: '',
  })

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      try {
        await uploadProfilePhoto(event.target.files[0])
      } catch (error) {
        console.error('Error uploading photo:', error)
      }
    }
  }

  const handleInputChange =
    (field: keyof UserFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value,
      }))
    }

  const handleSave = async () => {
    if (!user) return
    try {
      await updateUser({
        ...user,
        ...formData,
      } as User)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.',
      )
    ) {
      // Implement account deletion logic
    }
  }

  if (!user) {
    return null
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{py: 6, minWidth: '80vw'}}>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            textAlign: 'center',
            color: theme.palette.primary.main,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 60,
              height: 3,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            },
          }}
        >
          Account Settings
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.02)',
            border: '1px solid',
            borderColor: theme.palette.divider,
            transition:
              'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.shadows[4],
            },
          }}
        >
          <ProfileSection
            user={user}
            isEditing={isEditing}
            formData={formData}
            handlePhotoChange={handlePhotoChange}
            handleInputChange={handleInputChange}
          />

          <Box component="div" sx={{mt: 4, display: 'flex', justifyContent: 'center'}}>
            <Grid container sx={{gap: '6vw', maxWidth: '80vw'}}>
              <ContactInformation
                isEditing={isEditing}
                formData={formData}
                handleInputChange={handleInputChange}
              />

              <PasswordSection
                isEditing={isEditing}
                formData={formData}
                showPassword={showPassword}
                showNewPassword={showNewPassword}
                setShowPassword={setShowPassword}
                setShowNewPassword={setShowNewPassword}
                handleInputChange={handleInputChange}
              />

              <SocialAccounts
                isEditing={isEditing}
                formData={formData}
                handleInputChange={handleInputChange}
              />
            </Grid>
          </Box>

          <Divider sx={{my: 4}} />

          <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2}}>
            {isEditing ? (
              <>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<CancelIcon />}
                  onClick={() => setIsEditing(false)}
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 2,
                    },
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 2,
                    },
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                sx={{
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  },
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Paper>

        <DangerZone onDeleteAccount={handleDeleteAccount} />
      </Container>
    </MainLayout>
  )
}

export default AccountViewPage
