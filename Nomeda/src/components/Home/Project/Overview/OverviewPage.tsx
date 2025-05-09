import React, {useState} from 'react'
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
} from '@mui/material'
import {
  Assignment as TaskIcon,
  People as PeopleIcon,
  CheckCircle as DoneIcon,
  Schedule as PendingIcon,
  Description as TextIcon,
  FormatListBulleted as TodoIcon,
  AttachFile as FileIcon,
  Add as AddIcon,
} from '@mui/icons-material'
import StatCard from './StatCard'

interface ComponentType {
  id: string
  type: 'text' | 'todo' | 'file'
  title: string
  content?: string
  createdAt: Date
  properties?: {
    textContent?: string
    todos?: Array<{
      id: string
      text: string
      completed: boolean
      priority: 'low' | 'medium' | 'high'
      dueDate?: string
    }>
    files?: Array<{
      id: string
      name: string
      url: string
      type: string
      size: number
    }>
  }
}

const OverviewPage = () => {
  const [components, setComponents] = useState<ComponentType[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newComponent, setNewComponent] = useState<{
    title: string
    type: ComponentType['type']
  }>({
    title: '',
    type: 'text',
  })

  // Mock data for statistics
  const stats = {
    totalTasks: 12,
    completedTasks: 5,
    pendingTasks: 7,
    totalMembers: 4,
  }
  const handleAddComponent = () => {
    if (!newComponent.title.trim()) {
      return
    }

    const component: ComponentType = {
      id: Math.random().toString(36).substr(2, 9),
      type: newComponent.type,
      title: newComponent.title.trim(),
      createdAt: new Date(),
      properties: {
        textContent: newComponent.type === 'text' ? '' : undefined,
        todos: newComponent.type === 'todo' ? [] : undefined,
        files: newComponent.type === 'file' ? [] : undefined,
      },
    }

    setComponents([...components, component])
    setNewComponent({title: '', type: 'text'})
    setDialogOpen(false)
  }

  return (
    <Box sx={{p: 3}}>
      {/* Project Statistics */}
      <Typography variant="h5" gutterBottom fontWeight="500">
        Project Overview
      </Typography>
      <Grid container spacing={3} sx={{mb: 4}}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tasks"
            value={stats.totalTasks}
            icon={<TaskIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Tasks"
            value={stats.completedTasks}
            icon={<DoneIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Tasks"
            value={stats.pendingTasks}
            icon={<PendingIcon />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Team Members"
            value={stats.totalMembers}
            icon={<PeopleIcon />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>{' '}
      {/* Workspace Section */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" fontWeight="500">
          Workspace Blocks
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Add Block
        </Button>
      </Box>{' '}
      <Stack spacing={2}>
        {components.map(component => (
          <Card key={component.id} sx={{width: '100%', p: 2}}>
            <Stack spacing={2}>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                {component.type === 'text' && <TextIcon />}
                {component.type === 'todo' && <TodoIcon />}
                {component.type === 'file' && <FileIcon />}
                <Typography variant="h6">{component.title}</Typography>
              </Box>

              {/* Block Content */}
              <Box sx={{pl: 4}}>
                {component.type === 'text' && (
                  <TextField
                    multiline
                    fullWidth
                    minRows={3}
                    placeholder="Type your content here..."
                    value={component.properties?.textContent || ''}
                    onChange={e => {
                      const updatedComponents = components.map(c =>
                        c.id === component.id
                          ? {
                              ...c,
                              properties: {
                                ...c.properties,
                                textContent: e.target.value,
                              },
                            }
                          : c,
                      )
                      setComponents(updatedComponents)
                    }}
                    variant="outlined"
                    sx={{backgroundColor: 'background.paper'}}
                  />
                )}

                {component.type === 'todo' && (
                  <Stack spacing={1}>
                    {component.properties?.todos?.map(todo => (
                      <Box
                        key={todo.id}
                        sx={{display: 'flex', alignItems: 'center', gap: 1}}
                      >
                        <Checkbox
                          checked={todo.completed}
                          onChange={e => {
                            const updatedComponents = components.map(c =>
                              c.id === component.id
                                ? {
                                    ...c,
                                    properties: {
                                      ...c.properties,
                                      todos: c.properties?.todos?.map(t =>
                                        t.id === todo.id
                                          ? {...t, completed: e.target.checked}
                                          : t,
                                      ),
                                    },
                                  }
                                : c,
                            )
                            setComponents(updatedComponents)
                          }}
                        />
                        <TextField
                          value={todo.text}
                          onChange={e => {
                            const updatedComponents = components.map(c =>
                              c.id === component.id
                                ? {
                                    ...c,
                                    properties: {
                                      ...c.properties,
                                      todos: c.properties?.todos?.map(t =>
                                        t.id === todo.id
                                          ? {...t, text: e.target.value}
                                          : t,
                                      ),
                                    },
                                  }
                                : c,
                            )
                            setComponents(updatedComponents)
                          }}
                          variant="standard"
                          fullWidth
                          sx={{
                            textDecoration: todo.completed
                              ? 'line-through'
                              : 'none',
                            color: todo.completed
                              ? 'text.secondary'
                              : 'text.primary',
                          }}
                        />
                        <Select
                          value={todo.priority}
                          onChange={e => {
                            const updatedComponents = components.map(c =>
                              c.id === component.id
                                ? {
                                    ...c,
                                    properties: {
                                      ...c.properties,
                                      todos: c.properties?.todos?.map(t =>
                                        t.id === todo.id
                                          ? {...t, priority: e.target.value}
                                          : t,
                                      ),
                                    },
                                  }
                                : c,
                            )
                            setComponents(updatedComponents)
                          }}
                          size="small"
                          sx={{minWidth: 100}}
                        >
                          <MenuItem value="low">Low</MenuItem>
                          <MenuItem value="medium">Medium</MenuItem>
                          <MenuItem value="high">High</MenuItem>
                        </Select>
                      </Box>
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => {
                        const newTodo = {
                          id: Math.random().toString(36).substr(2, 9),
                          text: '',
                          completed: false,
                          priority: 'medium' as const,
                        }
                        const updatedComponents = components.map(c =>
                          c.id === component.id
                            ? {
                                ...c,
                                properties: {
                                  ...c.properties,
                                  todos: [
                                    ...(c.properties?.todos || []),
                                    newTodo,
                                  ],
                                },
                              }
                            : c,
                        )
                        setComponents(updatedComponents)
                      }}
                    >
                      Add Task
                    </Button>
                  </Stack>
                )}

                {component.type === 'file' && (
                  <Stack spacing={1}>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<FileIcon />}
                    >
                      Upload File
                      <input
                        type="file"
                        hidden
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const fileObj = {
                              id: Math.random().toString(36).substr(2, 9),
                              name: file.name,
                              url: URL.createObjectURL(file),
                              type: file.type,
                              size: file.size,
                            }
                            const updatedComponents = components.map(c =>
                              c.id === component.id
                                ? {
                                    ...c,
                                    properties: {
                                      ...c.properties,
                                      files: [
                                        ...(c.properties?.files || []),
                                        fileObj,
                                      ],
                                    },
                                  }
                                : c,
                            )
                            setComponents(updatedComponents)
                          }
                        }}
                      />
                    </Button>
                    {component.properties?.files?.map(file => (
                      <Box
                        key={file.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1,
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <FileIcon />
                        <Box sx={{flex: 1}}>
                          <Typography variant="body2">{file.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {(file.size / 1024).toFixed(2)} KB
                          </Typography>
                        </Box>
                        <Button
                          size="small"
                          component="a"
                          href={file.url}
                          target="_blank"
                          download={file.name}
                        >
                          Download
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>

              <Typography variant="caption" color="text.secondary">
                Created: {component.createdAt.toLocaleDateString()}
              </Typography>
            </Stack>
          </Card>
        ))}
      </Stack>
      {/* Add Component Dialog */}{' '}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>New Block</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{mt: 1}}>
            <TextField
              label="Block Title"
              fullWidth
              value={newComponent.title}
              onChange={e =>
                setNewComponent({...newComponent, title: e.target.value})
              }
              placeholder="Give this block a name..."
            />
            <FormControl fullWidth>
              <InputLabel>Block Type</InputLabel>
              <Select
                value={newComponent.type}
                label="Block Type"
                onChange={e =>
                  setNewComponent({
                    ...newComponent,
                    type: e.target.value as ComponentType['type'],
                  })
                }
              >
                <MenuItem
                  value="text"
                  sx={{display: 'flex', alignItems: 'center', gap: 1}}
                >
                  <TextIcon fontSize="small" />
                  Text Block
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ml: 'auto'}}
                  >
                    Rich text editor with formatting
                  </Typography>
                </MenuItem>
                <MenuItem
                  value="todo"
                  sx={{display: 'flex', alignItems: 'center', gap: 1}}
                >
                  <TodoIcon fontSize="small" />
                  Todo List
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ml: 'auto'}}
                  >
                    Task list with priorities
                  </Typography>
                </MenuItem>
                <MenuItem
                  value="file"
                  sx={{display: 'flex', alignItems: 'center', gap: 1}}
                >
                  <FileIcon fontSize="small" />
                  File Gallery
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ml: 'auto'}}
                  >
                    Upload & manage files
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddComponent}
            variant="contained"
            disabled={!newComponent.title.trim()}
          >
            Create Block
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default OverviewPage
