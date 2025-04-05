import React from "react";
import { Avatar, Tooltip, Stack } from "@mui/material";

interface User {
  name: string;
  avatar: string;
}

interface UserAvatarsProps {
  users: User[];
}

const UserAvatars: React.FC<UserAvatarsProps> = ({ users }) => {
  return (
    <Stack direction="row" spacing={-.5}>
      {users.map((user, index) => (
        <Tooltip key={index} title={user.name}>
          <Avatar
            alt={user.name}
            src={user.avatar}
            sx={{
              width: 24, // Set the avatar size (smaller)
              height: 24, // Set the avatar size (smaller)
            }}
          />
        </Tooltip>
      ))}
    </Stack>
  );
};

export default UserAvatars;
