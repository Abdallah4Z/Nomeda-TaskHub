import React from 'react'
import useTasks from '../../../../hooks/useTasks'
import LoadingSpinner from '../../../Common/LoadingSpinner'
import ListHeader from './ListHeader'
import ListCard from './ListCard'

const ListView: React.FC = () => {
  const { tasks, loading } = useTasks()

  if (loading) return <LoadingSpinner />

  return (
    <div
      style={{
        width: '90%',
        height: '100vh',
        padding: '16px',
        overflowY: 'auto',
        margin:'auto'
      }}
    >
      <ListHeader />
      {tasks.map(task => (
        <ListCard key={task.id} task={task} />
      ))}
    </div>
  )
}

export default ListView