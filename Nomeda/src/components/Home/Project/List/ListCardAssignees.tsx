import { Avatar, AvatarGroup, Box, Tooltip } from '@mui/material'

const ListCardAssignees = ({ users }: { users: { name: string, avatar: string }[] }) => (
  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center',  cursor: 'pointer'}}>
    <AvatarGroup max={3}>
      {users.map((user, index) => (
        <Tooltip key={index} title={user.name} placement="top">
          <Avatar
            alt={user.name}
            src={user.avatar}
            sx={{ width: 24, height: 24 }}
          />
        </Tooltip>
      ))}
    </AvatarGroup>
  </Box>
)

export default ListCardAssignees
