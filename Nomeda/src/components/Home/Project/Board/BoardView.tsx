import React from 'react'
import {Box, Typography} from '@mui/material'
import useTasks from '../../../../hooks/useTasks'
import Board from './Board' // adjust path based on your folder structure
import LoadingSpinner from '../../../Common/LoadingSpinner'

interface BoardData {
  id: string
  title: string
  // Add more fields if your Board needs them
}

interface BoardViewProps {
  boards: BoardData[]
}

const BoardView: React.FC<BoardViewProps> = () => {
  const {loading} = useTasks() // Use the custom hook for tasks

  if (loading) {
    return <LoadingSpinner color='danger'/>
  }

  const boards = [
    {id: '1', title: 'To Do'},
    {id: '2', title: 'In Progress'},
    {id: '3', title: 'Done'},
    {id: '4', title: 'Blocked'},
    
  ]
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap', // allows wrapping
        gap: 2, // spacing between boards
        p: 2,
        pl: 2, // padding around the container
        overflowX: 'auto', // optional: scrollable horizontally on small screens
        width: '100%',
      }}
    >
      {boards.map(board => (
        <Box key={board.id}>
          <Board label={board.title} />
        </Box>
      ))}
    </Box>
  )
}

export default BoardView
