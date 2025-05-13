import React from 'react';
import { 
  Box, 
  Typography, 
  LinearProgress, 
  Button, 
  Grid,
  Chip,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface OverviewHeaderProps {
  totalTasks: number;
  completedTasks: number;
}

const OverviewHeader: React.FC<OverviewHeaderProps> = ({ 
  totalTasks, 
  completedTasks 
}) => {
  const theme = useTheme();
  const completionRate = Math.round((completedTasks / totalTasks) * 100);
  
  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ mr: 2 }}>
                Task Completion
              </Typography>
              <Chip 
                label={`${completionRate}%`} 
                color="primary" 
                size="small" 
                sx={{ fontWeight: 500 }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {completedTasks} of {totalTasks} tasks completed
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={completionRate} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                }
              }} 
            />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            gap: 1
          }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              disableElevation
            >
              New Task
            </Button>
            
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />}
              sx={{ ml: 1 }}
            >
              Filter
            </Button>
            
            <Box sx={{ 
              display: 'flex', 
              border: '1px solid', 
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden'
            }}>
              <Button 
                variant="text" 
                sx={{ 
                  minWidth: 'auto', 
                  px: 1,
                  borderRadius: 0,
                  borderRight: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <ViewListIcon fontSize="small" />
              </Button>
              <Button 
                variant="text" 
                sx={{ 
                  minWidth: 'auto', 
                  px: 1,
                  borderRadius: 0
                }}
              >
                <ViewModuleIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewHeader;