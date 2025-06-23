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
  dueDate?: string;
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
  riskLevel?: string;
  categories?: any;
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
  type: "task" | "project" | "milestone";
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

export interface TaskListTableProps {
  tasks: Task[]
  plans: GanttPlan[]
  expandedPlans: string[]
  planColumnWidth: number
  ownerColumnWidth: number
  togglePlanExpansion: (planId: string) => void
  setPlanColumnWidth: (width: number) => void
  setOwnerColumnWidth: (width: number) => void
}

export interface TaskListTableProps {
  tasks: Task[]
  plans: GanttPlan[]
  expandedPlans: string[]
  planColumnWidth: number
  ownerColumnWidth: number
  togglePlanExpansion: (planId: string) => void
  onTogglePlanWidth: () => void
  onToggleOwnerWidth: () => void
  isPlanCollapsed: boolean
  isOwnerCollapsed: boolean
}

export interface TaskListHeaderProps {
  planColumnWidth: number
  ownerColumnWidth: number
  isDetailView?: boolean
  selectedPlanName?: string
  onBackClick?: () => void
}

export interface ToggleButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  isCollapsed?: boolean;
}
