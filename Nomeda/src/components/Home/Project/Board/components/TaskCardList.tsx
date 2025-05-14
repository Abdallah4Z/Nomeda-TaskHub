import React from 'react';
import { Edit, Delete, LabelImportant } from '@mui/icons-material';
import TaskCard from '../../../../Tasks/TaskCard';
import { Task, Action } from './types';

interface TaskCardListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onViewTask: (task: Task) => void;
}

const TaskCardList: React.FC<TaskCardListProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
  onViewTask
}) => {
  return (
    <div className="task-cards">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          users={task.users}
          assignedAt={task.assignedAt}
          priority={task.priority}
          actions={[
            {
              label: 'Edit',
              icon: <Edit sx={{ fontSize: 18 }} />,
              onClick: () => onEditTask(task),
            },
            {
              label: 'Delete',
              icon: <Delete sx={{ fontSize: 18 }} />,
              onClick: () => onDeleteTask(task.id),
            },
            {
              label: 'View',
              icon: <LabelImportant sx={{ fontSize: 18 }} />,
              onClick: () => onViewTask(task),
            },
          ]}
        />
      ))}
    </div>
  );
};

export default TaskCardList;
