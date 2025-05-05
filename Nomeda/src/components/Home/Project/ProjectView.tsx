import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  AvatarGroup,
  Avatar,
  Tooltip,
  Button,
  TextField,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';

// Importing the new components
import TextComponent from './Components/TextComponent/TextComponent';
import TodoComponent from './Components/ToDoComponent/TodoComponent';
import FileComponent from './Components/ImageComponent';
import { DropdownMenuItem } from './Components/ToDoComponent/types';

// Dummy user data for avatars
const dummyUsers = [
  { name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3' },
];

interface Component {
  type: 'text' | 'todo' | 'image';
  id: number;
  content?: string;
  imageUrl?: string;
}

const ProjectView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [projectName, setProjectName] = useState(`Project ${id}`);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [components, setComponents] = useState<Component[]>([]); // To store added components
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddComponent = (type: 'text' | 'todo' | 'image') => {
    const newComponent: Component = {
      type,
      id: Date.now(),
      content: type === 'text' ? '' : undefined,
      imageUrl: type === 'image' ? 'https://via.placeholder.com/600x400' : undefined,
    };
    setComponents([...components, newComponent]);
  };

  const handleUpdateContent = (id: number, content: string) => {
    const updatedComponents = components.map((comp) =>
      comp.id === id ? { ...comp, content } : comp
    );
    setComponents(updatedComponents);
  };

  const handleDuplicateComponent = (id: number) => {
    const componentToDuplicate = components.find((comp) => comp.id === id);
    if (componentToDuplicate) {
      const newComponent: Component = {
        ...componentToDuplicate,
        id: Date.now(), // New unique ID
      };
      setComponents([...components, newComponent]);
    }
  };

  const handleDeleteComponent = (id: number) => {
    setComponents(components.filter((comp) => comp.id !== id));
  };

  const getDropdownMenuItems = (componentId: number): DropdownMenuItem[] => [
    {
      label: 'Duplicate',
      action: () => handleDuplicateComponent(componentId),
    },
    {
      label: 'Delete',
      action: () => handleDeleteComponent(componentId),
    },
  ];

  useEffect(() => {
    document.title = `Project ${id}`;
  }, [id]);

  return (
    <Box sx={{ width: '80vw', m: 0, p: 0, minHeight: '90vh' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        {/* Editable Project Name */}
        <TextField
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          variant="standard"
          sx={{ flexGrow: 1 }}
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: '1.5rem', fontWeight: 'bold' },
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AvatarGroup max={4}>
            {dummyUsers.map((user) => (
              <Tooltip key={user.name} title={user.name}>
                <Avatar src={user.avatar} />
              </Tooltip>
            ))}
          </AvatarGroup>

          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Rename Project</MenuItem>
            <MenuItem onClick={handleMenuClose}>Delete Project</MenuItem>
            <MenuItem onClick={handleMenuClose}>Project Settings</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Main area: Add components like Notion */}
      <Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Start adding components below:
        </Typography>

        {/* Add Components */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            onClick={() => handleAddComponent('text')}
          >
            Add Text
          </Button>
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            onClick={() => handleAddComponent('todo')}
          >
            Add Todo List
          </Button>
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            onClick={() => handleAddComponent('image')}
          >
            Add Image
          </Button>
        </Box>

        {/* Display Components */}
        <Stack spacing={2} mt={3}>
          {components.map((component) => (
            <Box key={component.id}>
              {component.type === 'text' && (
                <TextComponent
                  id={component.id}
                  content={component.content || ''}
                  onChange={handleUpdateContent}
                  dropdownMenuItems={getDropdownMenuItems(component.id)}
                />
              )}

              {component.type === 'todo' && (
                <TodoComponent
                  id={component.id}
                  dropdownMenuItems={getDropdownMenuItems(component.id)}
                  onDeleteComponent={() => handleDeleteComponent(component.id)}
                />
              )}

              {component.type === 'image' && (
                <FileComponent id={0} file={undefined} />
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ProjectView;