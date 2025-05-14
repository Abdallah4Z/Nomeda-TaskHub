import React, { useState } from 'react';
import ProjectHeader from './Header/Header';
import { Project as ProjectType } from '../../../types/project';
import { Box } from '@mui/material';
import OverviewPage from './Overview/OverviewPage';
import ListView from './List/ListView';
import BoardView from './Board/BoardView';
import TabPanel from './Header/TabPanel';
import NavigationTabs from './Header/NavigationTabs';
import FilterControls from './Header/FilterControls';
import CalendarView from './Calender/UpcomingDeadlines';
import FileView from './Files/FilesView';

interface ProjectProps {
  project: ProjectType;
  onUpdate?: (updatedData: Partial<ProjectType>) => Promise<void>;
  refreshProject?: () => Promise<void>;
}

const Project: React.FC<ProjectProps> = ({ project, onUpdate, refreshProject }) => {
  const [tabValue, setTabValue] = useState(0);
  const [dueDateFilter, setDueDateFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const handleProjectEdit = (name: string, description?: string) => {
    if (onUpdate) {
      onUpdate({ name, description });
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <ProjectHeader
        projectName={project.name}
        projectDescription={project.description}
        onEdit={handleProjectEdit}
        onFilterChange={(e: React.ChangeEvent<{ value: unknown }>) => console.log(`Filter changed: ${e.target.value}`)}
      />
      
      <Box sx={{ borderRadius: '8px', p: 2, mx: '2vw', mt: 2 }}>
        <FilterControls
          dueDateFilter={dueDateFilter}
          assigneeFilter={assigneeFilter}
          priorityFilter={priorityFilter}
          setDueDateFilter={setDueDateFilter}
          setAssigneeFilter={setAssigneeFilter}
          setPriorityFilter={setPriorityFilter}
          onSave={() => console.log("Save changes")}
        />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <NavigationTabs tabValue={tabValue} setTabValue={setTabValue} />
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <OverviewPage project={project} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <ListView projectId={project._id} refreshProject={refreshProject} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <BoardView projectId={project._id} />
      </TabPanel>      <TabPanel value={tabValue} index={3}>
        <CalendarView/>
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <FileView />
      </TabPanel>
    </Box>
  );
};

export default Project;