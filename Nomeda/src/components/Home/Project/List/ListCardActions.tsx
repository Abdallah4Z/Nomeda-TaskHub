import { Box } from '@mui/material'
import SettingsMenu from '../../../Common/SettingsMenu'
import { Edit, Delete, LabelImportant } from '@mui/icons-material'

const taskActions = [
  {
    label: 'Edit',
    icon: <Edit fontSize="small" />,
    onClick: () => console.log('Edit Task'),
  },
  {
    label: 'Delete',
    icon: <Delete fontSize="small" />,
    onClick: () => console.log('Delete Task'),
  },
  {
    label: 'View',
    icon: <LabelImportant fontSize="small" />,
    onClick: () => console.log('View Task'),
  },
]

const ListCardActions = () => (
  <Box sx={{ width: 48 }}>
    <SettingsMenu actions={taskActions} />
  </Box>
)

export default ListCardActions
