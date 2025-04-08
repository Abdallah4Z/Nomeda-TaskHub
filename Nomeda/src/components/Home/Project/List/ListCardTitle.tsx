import { Box, Typography } from '@mui/material'

const ListCardTitle = ({ title }: { title: string }) => (
  <Box sx={{ flex: 3 }}>
    <Typography variant="body1" fontWeight={400}>
      {title}
    </Typography>
  </Box>
)

export default ListCardTitle
