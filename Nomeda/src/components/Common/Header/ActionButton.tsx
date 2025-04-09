import React from 'react';
import { IconButton, styled, Badge, Tooltip } from '@mui/material';

const StyledActionButton = styled(IconButton)({
  borderRadius: '12px',
  padding: '8px',
  color: '#5f6368',
  backgroundColor: 'transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: '#1a73e8',
  },
});

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  badgeCount?: number;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  badgeCount,
  onClick
}) => {
  return (
    <Tooltip title={label} arrow>
      <StyledActionButton onClick={onClick} aria-label={label}>
        {badgeCount !== undefined && badgeCount > 0 ? (
          <Badge 
            badgeContent={badgeCount} 
            color="error" 
            max={99}
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '10px',
                height: '18px',
                minWidth: '18px'
              }
            }}
          >
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </StyledActionButton>
    </Tooltip>
  );
};

export default ActionButton;