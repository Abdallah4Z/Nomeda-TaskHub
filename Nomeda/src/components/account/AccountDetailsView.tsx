import React from 'react';

interface AccountDetailsViewProps {
  user: {
    name: string;
    email: string;
    phone?: string;
    joinedDate: string;
  };
  onEdit: () => void;
}

export const AccountDetailsView: React.FC<AccountDetailsViewProps> = ({
  user,
  onEdit,
}) => (
  <div className="account-details-view">
    <div className="detail-row">
      <span className="detail-label">Name</span>
      <span className="detail-value">{user.name}</span>
    </div>
    
    <div className="detail-row">
      <span className="detail-label">Email</span>
      <span className="detail-value">{user.email}</span>
    </div>
    
    {user.phone && (
      <div className="detail-row">
        <span className="detail-label">Phone</span>
        <span className="detail-value">{user.phone}</span>
      </div>
    )}
    
    <div className="detail-row">
      <span className="detail-label">Member since</span>
      <span className="detail-value">
        {new Date(user.joinedDate).toLocaleDateString()}
      </span>
    </div>
    
    <button
      onClick={onEdit}
      className="btn btn-primary edit-btn"
    >
      Edit Profile
    </button>
  </div>
);