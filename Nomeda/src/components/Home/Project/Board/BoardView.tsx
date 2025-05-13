import React from 'react'
import { Box } from '@mui/material'
import useTasks from '../../../../hooks/useTasks'
import Board from './Board'
import LoadingSpinner from '../../../Common/LoadingSpinner'

interface BoardViewProps {
  projectId?: string
}

const BoardView: React.FC<BoardViewProps> = ({ projectId }) => {
  const { tasks, loading } = useTasks(projectId)

  if (loading) {
    return <LoadingSpinner color="danger" />
  }

  if (!projectId) {
    return <div>No project selected</div>
  }

  const boards = [
    {
      id: 'todo',
      title: 'To Do',
      tasks: tasks.filter((task) => task.status === 'todo'),
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: tasks.filter((task) => task.status === 'in-progress'),
    },
    {
      id: 'review',
      title: 'Review',
      tasks: tasks.filter((task) => task.status === 'review'),
    },
    {
      id: 'done',
      title: 'Done',
      tasks: tasks.filter((task) => task.status === 'done'),
    },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        padding: 2,
        overflowX: 'auto',
        width: '100%',
      }}
    >
      {boards.map((board) => (
        <Box key={board.id}>
          <Board label={board.title} tasks={board.tasks} />
        </Box>
      ))}
    </Box>
  )
}

export default BoardView
