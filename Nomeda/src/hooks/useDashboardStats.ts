import { useState, useEffect, useCallback } from 'react';
import { projectService } from '../services/projectService';
import { Project, User } from '../types/project';

interface ActiveProject {
  _id: string;
  name: string;
  progress: number;
  owner: User | string;
  members: (User | string)[];
}

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalProjects: number;
  taskCompletionRate: number;
  activeProjects: ActiveProject[];
  loading: boolean;
  error: string | null;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalProjects: 0,
    taskCompletionRate: 0,
    activeProjects: [],
    loading: true,
    error: null
  });

  const fetchStats = useCallback(async () => {
    try {
      // Fetch all projects the user has access to
      const projects = await projectService.getProjects();
      
      if (!projects || !Array.isArray(projects)) {
        throw new Error('Invalid response format');
      }

      let totalTasks = 0;
      let completedTasks = 0;
      let pendingTasks = 0;
      const activeProjects: ActiveProject[] = [];

      // Calculate stats from all projects
      projects.forEach((project) => {
        let projectTotalTasks = 0;
        let projectCompletedTasks = 0;

        if (project.stats) {
          // If the project has stats already calculated from the backend
          totalTasks += project.stats.totalTasks || 0;
          completedTasks += project.stats.completedTasks || 0;
          pendingTasks += project.stats.pendingTasks || 0;
          projectTotalTasks = project.stats.totalTasks || 0;
          projectCompletedTasks = project.stats.completedTasks || 0;
        } else if (project.tasks && Array.isArray(project.tasks)) {
          // If we need to calculate stats from the tasks array
          projectTotalTasks = project.tasks.length;
          projectCompletedTasks = project.tasks.filter((task) => task.status === 'done').length;
          totalTasks += projectTotalTasks;
          completedTasks += projectCompletedTasks;
          pendingTasks += project.tasks.filter((task) => task.status !== 'done').length;
        }

        // Calculate project progress
        const progress = projectTotalTasks > 0
          ? Math.round((projectCompletedTasks / projectTotalTasks) * 100)
          : 0;

        // Add to active projects list
        activeProjects.push({
          _id: project._id,
          name: project.name,
          progress,
          owner: project.owner,
          members: project.members
        });
      });

      // Calculate task completion rate
      const taskCompletionRate = totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

      setStats({
        totalTasks,
        completedTasks,
        pendingTasks,
        totalProjects: projects.length,
        taskCompletionRate,
        activeProjects,
        loading: false,
        error: null
      });

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setStats(prevStats => ({
        ...prevStats,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch stats'
      }));
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refreshStats = () => {
    setStats(prevStats => ({ ...prevStats, loading: true }));
    fetchStats();
  };

  return { ...stats, refreshStats };
};

export default useDashboardStats;
