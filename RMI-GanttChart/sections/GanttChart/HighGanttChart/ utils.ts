import type {
  ParentNodeLabelProps,
  ProcessedTaskData,
  TaskData,
} from "../../../types/high-gantt-types";

export const getParentNodeLabel = ({
  name,
  risk_name,
  tasks,
  status,
}: ParentNodeLabelProps): string => {
  const statusBadge = renderStatusBages(status);

  return (
    `<div class='project-label' style='line-height: 1.4; padding: 4px 0;'>` +
    `<div style='font-weight: bold; font-size: 14px; margin-bottom: 2px;'>${name}</div><br>` +
    `<div style='font-size: 12px; color: #666; margin-bottom: 4px;'>Risk: ${risk_name}</div><br>` +
    `<div style='display: flex; align-items: center; gap: 8px; flex-wrap: wrap;'>` +
    `<span style='font-size: 12px; color: #666;'>Tasks: ${tasks}</span>` +
    statusBadge +
    `</div></div>`
  );
};

export function renderStatusBages(status: string): string {
  const status_lower = status.toLowerCase();
  const baseStyle =
    "padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight:500; color: white; text-transform: capitalize; display: inline-flex; align-items: center; justify-content: center; line-height: 1; min-width: 70px; text-align: center;";

  switch (status_lower) {
    case "in progress":
      return `<span style="${baseStyle} background-color: #3B82F6;">${status}</span>`;
    case "delayed":
      return `<span style="${baseStyle} background-color: #F97316;">${status}</span>`;
    case "completed":
      return `<span style="${baseStyle} background-color: #22C55E;">${status}</span>`;
    case "cancelled":
      return `<span style="${baseStyle} background-color: #6c757d;">${status}</span>`;
    case "not started":
      return `<span style="${baseStyle} background-color: #E2E8F0; color: #334155;">${status}</span>`;
    default:
      return `<span style="${baseStyle} background-color: #6c757d;">${status}</span>`;
  }
}

export const processGanttData = (data: TaskData[]): ProcessedTaskData[] => {
  return data.map((p) => {
    if (p.owner) {
      return {
        ...p,
        name: getParentNodeLabel(p as ParentNodeLabelProps),
        className: "gantt-parent-node",
      };
    } else {
      const statusClass = p.status.toLowerCase().replace(/ /g, "-");
      return {
        ...p,
        className: `gantt-task-node status-${statusClass}`,
      };
    }
  });
};
