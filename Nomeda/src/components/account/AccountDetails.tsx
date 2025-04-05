import React, { useState } from 'react';
import { User } from '../../scripts/types';
import { ProfilePhoto } from './ProfilePhoto';
import { AccountForm } from './AccountForm';
import { AccountDetailsView } from './AccountDetailsView';

interface AccountDetailsProps {
  user: User;
  onUpdate: (updatedUser: User) => Promise<void>;
  onPhotoUpload: (file: File) => Promise<string>;
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({ 
  user, 
  onUpdate, 
  onPhotoUpload 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        const newPhotoUrl = await onPhotoUpload(e.target.files[0]);
        setFormData(prev => ({ ...prev, photoUrl: newPhotoUrl }));
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="account-container">
      <div className="account-header">
        <h1>Account Details</h1>
        <p>Manage your personal information</p>
      </div>

      <div className="profile-section">
        <ProfilePhoto
          photoUrl={formData.photoUrl}
          isEditing={isEditing}
          isUploading={isUploading}
          onPhotoChange={handlePhotoChange}
        />
      </div>

      {isEditing ? (
        <AccountForm
          formData={formData}
          onChange={handleChange}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleSave}
        />
      ) : (
        <AccountDetailsView
          user={user}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};