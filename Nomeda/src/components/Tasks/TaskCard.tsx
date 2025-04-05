import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Tooltip,
} from "@mui/material";
import UserAvatars from "../Common/UserAvatars";
import PriorityLabel from "./PriorityLabel";
import SettingsMenu from "../Common/SettingsMenu"; // your existing component
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

interface User {
  name: string;
  avatar: string;
}

interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface TaskCardProps {
  title: string;
  users: User[];
  assignedAt: string;
  priority: "High" | "Normal" | "Low";
  actions: Action[];
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  users,
  assignedAt,
  priority,
  actions,
}) => {
  return (
    <Card sx={{ maxWidth: 250, borderRadius: 2, p: 1, boxShadow: 3 }}>
      <CardContent sx={{ p: 1 }}>
        <Stack spacing={1}>

          {/* Title Row with Settings */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1" fontWeight="bold">
              {title}
            </Typography>
            <SettingsMenu actions={actions} />
          </Box>
             {/* Row: Users on the left */}
            <Box display="flex" justifyContent="flex-start">
            <UserAvatars users={users} />
          </Box>

          {/* Row: Assigned */}
          <Stack direction="row" alignItems="center">
            <Tooltip title="Assigned">
              <AssignmentIcon sx={{ mr: 1, fontSize: 18 }} />
            </Tooltip>
            <Typography variant="body2" color="text.secondary">
              {assignedAt}
            </Typography>
          </Stack>

          {/* Row: Priority */}
          <Stack direction="row" alignItems="center">
            <Tooltip title="Priority">
              <PriorityHighIcon sx={{ mr: 1, fontSize: 18 }} />
            </Tooltip>
            <PriorityLabel level={priority} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
