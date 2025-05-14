// Dashboard mock data
export const mockDashboardData = {
  stats: {
    totalTasks: 48,
    completedTasks: 32,
    pendingTasks: 16,
    teamMembers: 8,
  },
  taskCompletion: {
    current: 75,
    previous: 65,
  },
  teamPerformance: {
    current: 88,
    previous: 82,
  },
  taskDistribution: [
    {name: 'High Priority', value: 15, color: '#f44336'},
    {name: 'Medium Priority', value: 20, color: '#ff9800'},
    {name: 'Low Priority', value: 13, color: '#4caf50'},
  ],
  weeklyProgress: [
    {day: 'Mon', tasks: 12},
    {day: 'Tue', tasks: 15},
    {day: 'Wed', tasks: 8},
    {day: 'Thu', tasks: 17},
    {day: 'Fri', tasks: 10},
  ],
  recentActivities: [
    {
      id: 1,
      user: 'John Doe',
      action: 'completed',
      task: 'Update dashboard UI',
      time: '2 hours ago',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'commented',
      task: 'API Integration',
      time: '4 hours ago',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'created',
      task: 'User Authentication',
      time: '6 hours ago',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  ],
  activeProjects: [
    {
      name: 'Website Redesign',
      progress: 75,
      team: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
      ],
    },
    {
      name: 'Mobile App Development',
      progress: 45,
      team: [
        'https://i.pravatar.cc/150?img=3',
        'https://i.pravatar.cc/150?img=4',
        'https://i.pravatar.cc/150?img=5',
      ],
    },
  ],
}
