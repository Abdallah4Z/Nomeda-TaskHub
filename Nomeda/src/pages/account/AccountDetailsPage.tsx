import { Navigate } from 'react-router-dom';
import { AccountDetails } from '../../components/account/AccountDetails'
import { useAuth } from '../../hooks/useAuth'
import { User } from '../../scripts/types'
import '../../style/account.css';


export const AccountDetailsPage = () => {
  const { user, updateUser, uploadProfilePhoto } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }

  const handleUpdate = async (updatedUser: User) => {
    try {
      await updateUser(updatedUser)
    } catch (error) {
      console.error('Failed to update user:', error)
      // Handle errors
    }
  }

  const handlePhotoUpload = async (file: File) => {
    try {
      return await uploadProfilePhoto(file)
    } catch (error) {
      console.error('Failed to upload photo:', error)
      throw error // handle it
    }
  }

  return (
    <div className="container mx-auto p-4">
      <AccountDetails 
        user={user} 
        onUpdate={handleUpdate}
        onPhotoUpload={handlePhotoUpload}
      />
    </div>
  )
}