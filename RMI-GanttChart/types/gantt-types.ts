export interface TaskData {
  name: string;
  owner?: string;
  assignee?: string;
  risk_name?: string;
  tasks?: number;
  status: string;
  progress: number;
  id?: string;
  parent?: string;
  start: number;
  end: number;
  completed: {
    amount: number;
  };
}

export interface ParentNodeLabelProps {
  name: string;
  owner: string;
  risk_name: string;
  tasks: number;
  status: string;
  progress: number;
}

export interface ProcessedTaskData extends TaskData {
  className: string;
}

export interface GanttChartProps {
  data?: TaskData[];
}