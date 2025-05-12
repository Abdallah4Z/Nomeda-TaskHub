import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Button,
  Chip,
  Stack,
  Divider,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import useTasks from '../hooks/useTasks';
import TaskCard from '../components/Tasks/TaskCard';
import MainLayout from '../components/Layout/MainLayout';

interface BaseTask {
  id: string;
  title: string;
  users: { name: string; avatar: string }[];
  assignedAt: string;
  priority: 'High' | 'Normal' | 'Low';
}

interface ExtendedTask extends BaseTask {
  status: 'Todo' | 'In Progress' | 'Done' | 'Blocked';
  projectId: string;
  deadline?: Date;
}

interface Project {
  id: string;
  name: string;
  tasks: ExtendedTask[];
}

interface TaskColumn {
  title: string;
  status: ExtendedTask['status'];
  color: string;
}

const TasksPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { tasks: baseTasks, loading } = useTasks();
  const [projects, setProjects] = useState<Project[]>([]);

  // Define task columns with their respective colors
  const taskColumns: TaskColumn[] = [
    { title: 'To Do', status: 'Todo', color: theme.palette.info.light },
    { title: 'In Progress', status: 'In Progress', color: theme.palette.warning.light },
    { title: 'Done', status: 'Done', color: theme.palette.success.light },
    { title: 'Blocked', status: 'Blocked', color: theme.palette.error.light }
  ];

  // Group tasks by project and add missing properties
  useEffect(() => {
    if (!loading && baseTasks.length > 0) {
      const projectMap = new Map<string, Project>();
      
      baseTasks.forEach(baseTask => {
        // Add default properties to convert Task to ExtendedTask
        const extendedTask: ExtendedTask = {
          ...baseTask,
          status: 'Todo', // Default status
          projectId: baseTask.id.split('-')[0], // Assuming task ID format is "projectId-taskId"
          deadline: undefined
        };

        const projectId = extendedTask.projectId;
        if (!projectMap.has(projectId)) {
          projectMap.set(projectId, {
            id: projectId,
            name: `Project ${projectId}`, // Replace with actual project name when available
            tasks: []
          });
        }
        projectMap.get(projectId)?.tasks.push(extendedTask);
      });

      setProjects(Array.from(projectMap.values()));
    }
  }, [baseTasks, loading]);

  const navigateToProject = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Loading tasks...</Typography>
      </Box>
    );
  }

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>

      {projects.map((project) => (
        <Paper
          key={project.id}
          elevation={1}
          sx={{ mb: 4, p: 2, borderRadius: 2 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, width: '80vw'}}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {project.name}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              endIcon={<LaunchIcon />}
              onClick={() => navigateToProject(project.id)}
            >
              View Project
            </Button>
          </Box>

          <Grid container spacing={2}>
            {taskColumns.map((column) => (
              <Grid item xs={12} sm={6} md={3} key={column.status} width={'19vw'}>
                <Paper
                  sx={{
                    p: 2,
                    height: '100%',
                    backgroundColor: `${column.color}15`,
                    border: 1,
                    borderColor: `${column.color}30`,
                  }}
                >
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        {column.title}
                      </Typography>
                      <Chip
                        size="small"
                        label={project.tasks.filter(task => task.status === column.status).length}
                        sx={{ backgroundColor: `${column.color}30` }}
                      />
                    </Box>
                    <Divider />
                    <Stack spacing={1}>
                      {project.tasks
                        .filter(task => task.status === column.status)
                        .map(task => (
                          <TaskCard
                            key={task.id}
                            title={task.title}
                            users={task.users}
                            assignedAt={task.assignedAt}
                            priority={task.priority}
                            actions={[
                              {
                                label: 'Edit',
                                onClick: () => console.log('Edit task', task.id)
                              },
                              {
                                label: 'Delete',
                                onClick: () => console.log('Delete task', task.id)
                              }
                            ]}
                          />
                        ))}
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </MainLayout>
  );
};

export default TasksPage;