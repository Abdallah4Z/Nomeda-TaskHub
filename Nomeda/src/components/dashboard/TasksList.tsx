import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../../style/dashboard.css';

interface Project {
  id: number;
  title: string;
  description: string;
  progress: number;
}

function ProjectsList() {
  const [projects] = useState<Project[]>([
    { id: 1, title: 'Project 1', description: 'This is the first project', progress: 25 },
    { id: 2, title: 'Project 2', description: 'This is the second project', progress: 50 },
    { id: 3, title: 'Project 3', description: 'This is the third project', progress: 100 },
    { id: 4, title: 'Project 4', description: 'This is the fourth project', progress: 10 },
    { id: 5, title: 'Project 5', description: 'This is the fifth project', progress: 60 },
    { id: 6, title: 'Project 6', description: 'This is the sixth project', progress: 90 },
    { id: 7, title: 'Project 7', description: 'This is the seventh project', progress: 35 },
    { id: 8, title: 'Project 8', description: 'This is the eighth project', progress: 45 },
  ]);

  const [startIndex, setStartIndex] = useState(0);
  const visibleProjects = projects.slice(startIndex, startIndex + 3);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + 3 < projects.length) setStartIndex(startIndex + 1);
  };

  const getProgressColor = (value: number) => {
    if (value < 40) return '#e57373'; // red
    if (value < 75) return '#ffb74d'; // orange
    return '#81c784'; // green
  };

  return (
    <Box className="projects-container">
      <Box className="projects-header-box">
        <IconButton onClick={handlePrev} disabled={startIndex === 0}>
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        <Typography variant="h5" className="projects-header">
          Projects
        </Typography>
        <IconButton onClick={handleNext} disabled={startIndex + 3 >= projects.length}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box className="projects-box">
        {visibleProjects.map((project) => (
          <Card key={project.id} className="project-card interactive-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="h6">{project.title}</Typography>
                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={project.progress}
                    size={50}
                    thickness={3}
                    style={{ color: getProgressColor(project.progress) }}
                  />
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="caption" component="div" color="textSecondary">
                      {`${Math.round(project.progress)}%`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {project.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default ProjectsList;
