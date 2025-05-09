import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  Divider,
  IconButton,
  useTheme
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  change
}) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 2,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        border: '1px solid',
        borderColor: 'divider',
        width: 220
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            width: 48,
            height: 48,
            bgcolor: `${color}15`,
            color: color,
          }}
        >
          {icon}
        </Box>
        <IconButton size="small">
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      </Box>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 600, my: 1 }}>
          {value}
        </Typography>
      </Box>
      
      {change && (
        <>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 1,
                px: 0.8,
                py: 0.3,
                mr: 1,
                backgroundColor: change.isPositive ? 'success.light' : 'error.light',
                color: change.isPositive ? 'success.dark' : 'error.dark',
              }}
            >
              <Typography variant="caption" fontWeight="bold">
                {change.isPositive ? '+' : '-'}{Math.abs(change.value)}%
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              vs last month
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default StatCard;