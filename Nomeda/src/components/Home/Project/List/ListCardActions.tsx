import { Box } from '@mui/material'
import SettingsMenu from '../../../Common/SettingsMenu'
import { Edit, Delete, LabelImportant } from '@mui/icons-material'

const taskActions = [
  {
    label: 'Edit',
    icon: <Edit fontSize="small" />,
    onClick: (onEdit: () => void) => onEdit(), // Pass the onEdit function to the onClick
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

interface ListCardActionsProps {
  onEdit: () => void
}

const ListCardActions = ({ onEdit }: ListCardActionsProps) => (
  <Box sx={{ width: 48 }}>
    <SettingsMenu
      actions={taskActions.map((action) => ({
        ...action,
        onClick: () => action.onClick(onEdit), // Pass onEdit to Edit action
      }))}
    />
  </Box>
)

export default ListCardActions
