import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import '../../style/dashboard.css'; 

interface StatusProps {
  totalTasks?: number;
  inProgress?: number;
  remaining?: number;
  completed?: number;
}

const Status: React.FC<StatusProps> = ({
  totalTasks = 0,
  inProgress = 0,
  remaining = 0,
  completed = 0
}) => {
  const statusItems = [
    { icon: FormatListBulletedIcon, count: totalTasks, label: "Total Task", color: "#a49cf1" },
    { icon: HourglassTopIcon, count: inProgress, label: "In Progress", color: "#9ed2d2" },
    { icon: RotateRightIcon, count: remaining, label: "Remaining", color: "#f5b8b0" },
    { icon: TaskAltIcon, count: completed, label: "Completed", color: "#b2edc5" }
  ];

  return (
    <Grid container spacing={2} mb={2} width={800}>
      {statusItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <Grid item xs={3} key={index}>
            <Paper elevation={3} className="status-card" style={{backgroundColor: item.color}}>
              <div className="status-row">
                <div className="icon-container" style={{ backgroundColor: 'white', color: item.color }}>
                  <IconComponent className="status-icon" />
                </div>
                <div className="status-content">
                  <Typography variant="h6" className="status-count">{item.count}</Typography>
                  <Typography variant="body2" className="status-label">{item.label}</Typography>
                </div>
              </div>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Status;