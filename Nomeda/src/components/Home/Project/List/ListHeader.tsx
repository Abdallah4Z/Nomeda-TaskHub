import { Box, Divider } from '@mui/material'

const ListHeader: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 600,
          paddingY: 1,
          paddingX: 2,
          borderRadius: 1,
        }}
      >
        <Box sx={{ flex: 3 }}>Title</Box>
        <Box sx={{ flex: 1 }}>Assignees</Box>
        <Box sx={{ flex: 1 }}>Time</Box>
        <Box sx={{ flex: 1 }}>Label</Box>
        <Box sx={{ flex: 1 }}>Priority</Box>

      </Box>
      <Divider sx={{ marginY: 1 }} />
    </>
  )
}

export default ListHeader