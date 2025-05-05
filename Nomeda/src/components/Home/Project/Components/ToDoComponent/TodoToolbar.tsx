import React, {useState} from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Button,
  Box,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  Fullscreen,
  FullscreenExit,
  Save,
  DeleteForever,
  Edit,
  Delete,
  MoreVert,
} from '@mui/icons-material'
import {DropdownMenuItem} from './types'

interface TodoToolbarProps {
  isFullscreen: boolean
  isViewMode: boolean
  onToggleFullscreen: () => void
  onSave: () => void
  onDeleteAll: () => void
  onEditMode: () => void
  onDeleteComponent: () => void
  dropdownMenuItems: DropdownMenuItem[]
}

const TodoToolbar: React.FC<TodoToolbarProps> = ({
  isFullscreen,
  isViewMode,
  onToggleFullscreen,
  onSave,
  onDeleteAll,
  onEditMode,
  onDeleteComponent,
  dropdownMenuItems,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{display: 'flex', justifyContent: 'end', gap:0, m :-1, mt: 3}}>
        <Box />
        {!isViewMode && (
          <>
            <Tooltip title="Save">
              <span>
                <IconButton onClick={onSave}>
                  <Save />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Delete All Todos">
              <span>
                <IconButton onClick={onDeleteAll} color="error">
                  <DeleteForever />
                </IconButton>
              </span>
            </Tooltip>
          </>
          )}

          <IconButton onClick={handleMenuClick}>
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem
              onClick={() => {
                onEditMode()
                handleMenuClose()
              }}
              > Edit</MenuItem>
            {dropdownMenuItems.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  item.action()
                  handleMenuClose()
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
    </ Box>
  )
}

export default TodoToolbar
