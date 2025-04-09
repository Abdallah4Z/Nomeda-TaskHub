import { useState, useEffect } from 'react'

interface User {
  name: string
  avatar: string
}

interface Action {
  label: string
  icon?: React.ReactNode
  onClick: () => void
}

interface Task {
  id: string
  title: string
  users: User[]
  assignedAt: string
  priority: 'High' | 'Normal' | 'Low'
  actions: Action[]
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Function to generate random avatar using RoboHash API
  const getRandomAvatar = (name: string) => {
    const avatarUrl = `https://robohash.org/${name}?set=set5&size=200x200`; // set5 creates robot avatars
    return avatarUrl;
  };

  useEffect(() => {
    setTimeout(() => {
      // Simulate fetching tasks from an API or any source
      const fetchedTasks: Task[] = [
        {
          id: '1',
          title: 'Design login page',
          users: [
            { name: 'Lina', avatar: getRandomAvatar('Lina') },
            { name: 'Abdallah', avatar: getRandomAvatar('Abdallah') },
          ],
          assignedAt: 'Apr 6, 2025',
          priority: 'High',
          actions: [
            { label: 'Edit', onClick: () => console.log('Edit Task') },
            { label: 'Delete', onClick: () => console.log('Delete Task') },
          ],
        },
        {
          id: '2',
          title: 'Implement backend API',
          users: [
            { name: 'Ahmed', avatar: getRandomAvatar('Ahmed') },
          ],
          assignedAt: 'Apr 7, 2025',
          priority: 'Low',
          actions: [
            { label: 'Edit', onClick: () => console.log('Edit Task') },
            { label: 'Delete', onClick: () => console.log('Delete Task') },
          ],
        },
      ]
      setTasks(fetchedTasks)
      setLoading(false)
    }, 1500) // Simulate 1.5 seconds loading time
  }, [])

  return { tasks, loading }
}

export default useTasks
