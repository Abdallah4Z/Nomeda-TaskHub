import React from 'react';
import ProjectHeader from './Header/Header';

const ProjectBoard = () => {
  const [tasks, setTasks] = React.useState([
    { id: 1, title: 'Solutions Pages', dueDate: 'March 17 - 9:00AM', priority: 'Normal' },
    { id: 2, title: 'Order Flow', dueDate: 'March 17 - 9:00AM', priority: 'High' },
    // Add more tasks as needed
  ]);

  const handleEditTask = (taskId) => {
    console.log(`Editing task with ID: ${taskId}`);
  };

  const handleDeleteTask = (taskId) => {
    console.log(`Deleting task with ID: ${taskId}`);
  };

  const handleAddNew = () => {
    console.log('Adding a new task');
  };

  return (
    <div >
      <ProjectHeader
        projectName="Design Project"
        onEdit={() => console.log('Editing project')}
        onFilterChange={(e) => console.log(`Filter changed: ${e.target.value}`)}
      />
      
    </div>
  );
};

export default ProjectBoard;