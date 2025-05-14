import { useState, useEffect, useCallback } from 'react';
import { projectService } from '../services/projectService';
import { Project } from '../types/project';

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalProjects: number;
  loading: boolean;
  error: string | null;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalProjects: 0,
    loading: true,
    error: null
  });

  const fetchStats = useCallback(async () => {
    try {
      // Fetch all projects the user has access to
      const projects = await projectService.getProjects();      if (!projects || !Array.isArray(projects)) {
        throw new Error('Invalid response format');
      }

      let totalTasks = 0;
      let completedTasks = 0;
      let pendingTasks = 0;

      // Calculate stats from all projects
      projects.forEach((project) => {
        if (project.stats) {
          // If the project has stats already calculated from the backend
          totalTasks += project.stats.totalTasks || 0;
          completedTasks += project.stats.completedTasks || 0;
          pendingTasks += project.stats.pendingTasks || 0;
        } else if (project.tasks && Array.isArray(project.tasks)) {
          // If we need to calculate stats from the tasks array
          totalTasks += project.tasks.length;
          completedTasks += project.tasks.filter((task) => task.status === 'done').length;
          pendingTasks += project.tasks.filter((task) => task.status !== 'done').length;
        }
      });

      setStats({
        totalTasks,
        completedTasks,
        pendingTasks,
        totalProjects: projects.length,
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
