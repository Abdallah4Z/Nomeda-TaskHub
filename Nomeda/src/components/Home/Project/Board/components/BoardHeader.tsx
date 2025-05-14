import React from 'react';
import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import SettingsMenu from '../../../../Common/SettingsMenu';
import { BoardHeaderProps } from './types';

const BoardHeader: React.FC<BoardHeaderProps> = ({ label, actions, getColorByLabel }) => {
  return (
    <div className="board-header">
      <Chip
        label={label}
        icon={
          label.toLowerCase() === 'done' ? (
            <CheckCircleIcon sx={{ fontSize: 16, color: 'green' }} />
          ) : (
            <HourglassBottomIcon sx={{ fontSize: 16, color: 'orange' }} />
          )
        }
        color={getColorByLabel(label)}
        variant="outlined"
        size="small"
        sx={{ pr: 2, justifyContent: 'start', pl: 0.5 }}
      />
      <SettingsMenu actions={actions} />
    </div>
  );
};

export default BoardHeader;
