import React from 'react'
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material'

interface Activity {
  id: number
  user: string
  action: string
  task: string
  time: string
  avatar: string
}

interface ActivitiesSectionProps {
  recentActivities: Activity[]
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  recentActivities,
}) => {
  return (
    <Grid item xs={12} md={6}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Recent Activities
        </Typography>
        <List>
          {recentActivities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={activity.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={activity.user}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {activity.action}
                      </Typography>
                      {` — ${activity.task}`}
                      <Typography
                        component="div"
                        variant="caption"
                        color="text.secondary"
                        sx={{mt: 0.5}}
                      >
                        {activity.time}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < recentActivities.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Grid>
  )
}

export default ActivitiesSection
