export interface GanttTask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  assignee: string;
  status: string;
  planId: string;
  planName: string;
  isParent?: boolean;
}

export interface GanttPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  owner: string;
  status: string;
  linkedRisk: string;
  riskCategory: string;
  tasks: GanttTask[];
  isParent?: boolean;
  hasSubTasks?: boolean;
}

export type TaskStatus =
  | "Completed"
  | "In Progress"
  | "Delayed"
  | "Not Started"
  | "Cancel";

export interface Task {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  type: "task" | "project";
  project?: string;
  hideChildren?: boolean;
  styles?: {
    progressColor?: string;
    progressSelectedColor?: string;
    backgroundColor?: string;
    backgroundSelectedColor?: string;
  };
  isParent?: boolean;
}
