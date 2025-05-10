import React, {useState} from 'react'
import {Box, useTheme} from '@mui/material'
import TabPanel from './TabPanel'
import FilterControls from './FilterControls'
import ProjectTitle from './ProjectTitle'
import ProjectActions from './ProjectActions'
import NavigationTabs from './NavigationTabs'
import OverviewPage from '../Overview/OverviewPage'
import ListView from '../List/ListView'
import BoardView from '../Board/BoardView'
import CalendarView from '../Calender/UpcomingDeadlines'
import FilesView from '../Files/FilesView'
import useTasks from '../../../../hooks/useTasks'

const Header = ({projectName = 'Design Project', onEdit = () => {}}) => {
  const theme = useTheme()
  // State to manage filter values
  const [dueDateFilter, setDueDateFilter] = useState('all')
  const [assigneeFilter, setAssigneeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [tabValue, setTabValue] = useState(2) // "Board" tab is active by default

  const {tasks} = useTasks()
  const users = tasks[1]?.users || []

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        mt: 5,
        justifyContent: 'center',
        alignItems: 'center',
        ml: '2vw',
      }}
    >
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.background.paper
              : '#fff',
          color: theme.palette.text.primary,
          borderRadius: '8px',
          p: 2,
          flexShrink: 0,
          width: '90%',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 4px 6px rgba(0, 0, 0, 0.3)'
              : '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s, box-shadow 0.3s',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <ProjectTitle projectName={projectName} onEdit={onEdit} />
          <ProjectActions users={users} />
        </Box>

        <NavigationTabs tabValue={tabValue} setTabValue={setTabValue} />

        <FilterControls
          dueDateFilter={dueDateFilter}
          assigneeFilter={assigneeFilter}
          priorityFilter={priorityFilter}
          setDueDateFilter={setDueDateFilter}
          setAssigneeFilter={setAssigneeFilter}
          setPriorityFilter={setPriorityFilter}
        />
      </Box>

      {/* Tab Content Panels */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          width: '90%',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.background.default
              : theme.palette.background.paper,
          borderRadius: '8px',
          mt: 2,
          transition: 'background-color 0.3s',
        }}
      >
        <TabPanel value={tabValue} index={0}>
          <OverviewPage />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <ListView />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <BoardView boards={[]} />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <CalendarView />
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <FilesView />
        </TabPanel>
      </Box>
    </Box>
  )
}

export default Header
