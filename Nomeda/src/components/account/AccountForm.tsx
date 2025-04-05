import React from 'react';

interface AccountFormProps {
  formData: {
    name: string;
    email: string;
    phone?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AccountForm: React.FC<AccountFormProps> = ({
  formData,
  onChange,
  onCancel,
  onSubmit,
}) => (
  <form onSubmit={onSubmit} className="account-form">
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        required
      />
    </div>
    
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        required
      />
    </div>
    
    <div className="form-group">
      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        type="tel"
        name="phone"
        value={formData.phone || ''}
        onChange={onChange}
      />
    </div>
    
    <div className="account-actions">
      <button
        type="button"
        onClick={onCancel}
        className="btn btn-secondary"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="btn btn-primary"
      >
        Save Changes
      </button>
    </div>
  </form>
);