import {Box} from '@mui/material'
import SettingsMenu from '../../../Common/SettingsMenu'
import {Edit, Delete, LabelImportant} from '@mui/icons-material'

interface ListCardActionsProps {
  onEdit: () => void
  onDelete: () => void
  onView: () => void
}

const ListCardActions = ({onEdit, onDelete, onView}: ListCardActionsProps) => {
  const taskActions = [
    {
      label: 'Edit',
      icon: <Edit fontSize="small" />,
      onClick: onEdit,
    },
    {
      label: 'Delete',
      icon: <Delete fontSize="small" />,
      onClick: onDelete,
    },
    {
      label: 'View',
      icon: <LabelImportant fontSize="small" />,
      onClick: onView,
    },
  ]

  return (
    <Box sx={{width: 48}}>
      <SettingsMenu actions={taskActions} />
    </Box>
  )
}

export default ListCardActions
