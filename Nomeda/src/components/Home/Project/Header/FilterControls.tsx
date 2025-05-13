import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskDialog from './TaskDialog';
import useTasks from '../../../../hooks/useTasks';


interface FilterControlsProps {
  dueDateFilter: string;
  assigneeFilter: string;
  priorityFilter: string;
  setDueDateFilter: (value: string) => void;
  setAssigneeFilter: (value: string) => void;
  setPriorityFilter: (value: string) => void;
  onSave?: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  dueDateFilter,
  assigneeFilter,
  priorityFilter,
  setDueDateFilter,
  setAssigneeFilter,
  setPriorityFilter,
  onSave = () => console.log('Save changes'),
}) => {  const [openDialog, setOpenDialog] = useState(false);
  const { tasks, addTask, refreshTasks } = useTasks();

  const handleFilterChange = (setter: (value: string) => void) => (event: React.ChangeEvent<{ value: unknown }>) => {
    setter(event.target.value as string);
  };
  const handleAddTask = async (task: {
    title: string;
    description?: string;
    priority: 'High' | 'Normal' | 'Low';
    assignedAt?: string;
    users: Array<{ name: string; avatar: string; }>
  }) => {
    try {
      if (!task.title) {
        throw new Error('Task title is required');
      }
      
      await addTask({
        title: task.title,
        description: task.description || '',
        status: 'todo',
        priority: task.priority || 'Normal',
        dueDate: task.assignedAt || null,
        assignees: task.users ? task.users.map(user => user.name) : [],
        labels: []
      });
      refreshTasks();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Box sx={{ pb: 2, pt: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ flexGrow: 1 }} />        <Button
          variant="contained"
          onClick={onSave}
        >
          Save Changes
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add New
        </Button>
      </Stack>

      <TaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAddTask={handleAddTask}
      />
    </Box>
  );
};

export default FilterControls;
