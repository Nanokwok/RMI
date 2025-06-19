import type { ParentNodeLabelProps, ProcessedTaskData, TaskData } from '../../types/gantt-types'

// Function to generate the HTML label for parent nodes
export const getParentNodeLabel = ({ 
  name, 
  owner, 
  risk_name, 
  tasks, 
  status, 
  progress 
}: ParentNodeLabelProps): string => {
  return `
    <div class='project-label'>
      <span class='project-name'>${name}</span><br />
      <span class='project-risk'>Owner: ${owner}</span><br />
      <span class='project-risk'>Risk: ${risk_name}</span><br />
      <span class='project-risk'>Tasks: ${tasks}</span><br />
      <div class='project-status'>
        <span class='badge-status badge-${status.replace(/ /g, '-')}'>${status}</span>
        <span class='project-progress'>${progress}%</span>
      </div>
    </div>
  `;
}

// Function to render status badges for the Y-axis labels
export const renderStatusBadges = (status: string): string => {
  const status_lower = status;
  return `<span class='badge-status badge-${status_lower.replace(/ /g, '-')}'>${status}</span>`
};

// Process data to match Highcharts Gantt series format
export const processGanttData = (data: TaskData[]): ProcessedTaskData[] => {
  return data.map(p => {
    if (p.owner) {
      // Parent node (project)
      return {
        ...p,
        name: getParentNodeLabel(p as ParentNodeLabelProps),
        className: 'gantt-parent-node'
      };
    } else {
      // Child task node
      return {
        ...p,
        className: `gantt-task-node status-${p.status.toLowerCase().replace(/ /g, '-')}`
      };
    }
  })
}
