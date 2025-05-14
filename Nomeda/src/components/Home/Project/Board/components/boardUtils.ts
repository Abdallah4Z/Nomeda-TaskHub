// Helper functions for Board component

/**
 * Gets the color for a label based on its name
 * @param label The label text
 * @returns A MUI color name
 */
export const getColorByLabel = (label: string) => {
  switch (label.toLowerCase()) {
    case 'to do':
      return 'warning';
    case 'in progress':
      return 'info';
    case 'review':
      return 'secondary'; 
    case 'done':
      return 'success';
    case 'blocked':
      return 'error';
    case 'maniak':
      return 'secondary';
    case 'ahmed':
      return 'primary';
    default:
      return 'default';
  }
};

/**
 * Convert board label to status string
 * @param label The board label
 * @returns The status code
 */
export const getBoardStatusFromLabel = (label: string): 'todo' | 'in-progress' | 'review' | 'done' => {
  const labelLower = label.toLowerCase();
  if (labelLower === 'to do') return 'todo';
  if (labelLower === 'in progress') return 'in-progress';
  if (labelLower === 'review') return 'review';
  if (labelLower === 'done') return 'done';
  return 'todo'; // Default
};

/**
 * Gets a display name for a status code
 * @param status The status code
 * @returns Human-readable status name
 */
export const getStatusDisplayName = (status: string | undefined) => {
  switch (status) {
    case 'todo': return 'To Do';
    case 'in-progress': return 'In Progress';
    case 'review': return 'Review';
    case 'done': return 'Done';
    default: return 'To Do';
  }
};
