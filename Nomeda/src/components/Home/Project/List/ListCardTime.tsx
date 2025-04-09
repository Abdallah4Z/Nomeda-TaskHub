import { Box, Typography } from '@mui/material'
import { AccessTime } from '@mui/icons-material'

const ListCardTime = ({ time }: { time: string }) => (
  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
    <AccessTime sx={{ fontSize: 13, marginRight: 0.5 }} />
    <Typography variant="caption">{time}</Typography>
  </Box>
)

export default ListCardTime
