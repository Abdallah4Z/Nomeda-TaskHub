import { Box, Chip } from '@mui/material'

const ListCardLabel = () => (
  <Box sx={{ flex: 1 , display:'flex', alignItems: 'center' }}>
    <Chip
      label="In Progress"
      variant="outlined"
      size="small"
      sx={{ height: 24, fontSize: 12 }}
    />
  </Box>
)

export default ListCardLabel
