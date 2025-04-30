import React from 'react';
import { Box, Typography, Grid, Paper, CircularProgress, IconButton, Divider } from '@mui/material';
import { CheckCircle, Error, Assignment, TrendingUp, ArrowForward } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const OverviewPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: 4, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Task Summary */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 2,
              boxShadow: 3,
              background: `linear-gradient(145deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: 'white',
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ opacity: 0.7 }}>
                Total Tasks
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                120
              </Typography>
            </Box>
            <Assignment fontSize="large" />
          </Paper>
        </Grid>

        {/* In Progress */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: theme.palette.warning.light,
              color: theme.palette.warning.dark,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ opacity: 0.7 }}>
                In Progress
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                65
              </Typography>
            </Box>
            <CircularProgress size={60} variant="determinate" value={65} sx={{ color: theme.palette.warning.main }} />
          </Paper>
        </Grid>

        {/* Completed */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: theme.palette.success.light,
              color: theme.palette.success.dark,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ opacity: 0.7 }}>
                Completed
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                55
              </Typography>
            </Box>
            <CheckCircle fontSize="large" />
          </Paper>
        </Grid>

        {/* Overdue Tasks */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: theme.palette.error.light,
              color: theme.palette.error.dark,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ opacity: 0.7 }}>
                Overdue Tasks
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                5
              </Typography>
            </Box>
            <Error fontSize="large" />
          </Paper>
        </Grid>

        {/* Progress */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: theme.palette.primary.light,
              color: 'white',
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ opacity: 0.7 }}>
                Progress
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                80%
              </Typography>
            </Box>
            <CircularProgress size={60} variant="determinate" value={80} sx={{ color: 'white' }} />
          </Paper>
        </Grid>

        {/* Growth */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: theme.palette.info.light,
              color: theme.palette.info.dark,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ opacity: 0.7 }}>
                Growth
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                +20
              </Typography>
            </Box>
            <TrendingUp fontSize="large" />
          </Paper>
        </Grid>
      </Grid>

      {/* Action Button */}
      <Box sx={{ marginTop: 3, textAlign: 'center' }}>
        <IconButton
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            padding: 2,
            borderRadius: '50%',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <ArrowForward fontSize="large" />
        </IconButton>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          View All Tasks
        </Typography>
      </Box>
    </Box>
  );
};

export default OverviewPage;
