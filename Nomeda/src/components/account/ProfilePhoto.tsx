import React, { useRef } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';
import cameraLogo from '../../assets/camera.svg';

interface ProfilePhotoProps {
  photoUrl?: string;
  isEditing: boolean;
  isUploading: boolean;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  photoUrl,
  isEditing,
  isUploading,
  onPhotoChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="profile-photo-container">
      <img 
        src={photoUrl || '../../assets/default-user-img.svg'} 
        alt="Profile" 
        className="profile-photo"
      />
      {isEditing && (
        <>
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="photo-upload-btn"
            aria-label="Change profile photo"
          >
            {isUploading ? (
              <LoadingSpinner size="sm" color="secondary" />
            ) : (
              <img src={cameraLogo} alt="add" className='h-4 w-4' width={25} />
            )}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onPhotoChange}
            accept="image/*"
            className="photo-upload-input"
          />
        </>
      )}
    </div>
  );
};