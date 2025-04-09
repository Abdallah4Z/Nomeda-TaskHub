import React from "react";
import { Avatar, Tooltip, Stack } from "@mui/material";

interface User {
  name: string;
  avatar: string;
}

interface UserAvatarsProps {
  users: User[];
  size?: number;
}

const UserAvatars: React.FC<UserAvatarsProps> = ({ users, size = 24 }) => {
  return (
    <Stack direction="row" spacing={-0.5}>
      {users.map((user, index) => (
        <Tooltip key={index} title={user.name}>
          <Avatar
            alt={user.name}
            src={user.avatar}
            sx={{
              width: size,
              height: size,
              fontSize: size * 0.5, // Adjust initials font size if no image
            }}
          />
        </Tooltip>
      ))}
    </Stack>
  );
};


export default UserAvatars;
