export type FilterState = {
  planTasksStatus: string[];
  level: string[];
  quickFilters: string[];
  timeline: {
    startDate: string;
    endDate: string;
    showOverdue: boolean;
  };
  categories: string[];
};

export type Action =
  // plan tasks status
  | { type: "TOGGLE_PLAN_TASK_STATUS"; payload: string }
  | { type: "REMOVE_PLAN_TASK_STATUS"; payload: string }
  // risk level
  | { type: "TOGGLE_LEVEL"; payload: string }
  | { type: "REMOVE_LEVEL"; payload: string }
  // quick filters
  | { type: "TOGGLE_QUICK_FILTER"; payload: string }
  | { type: "REMOVE_QUICK_FILTER"; payload: string }
  | {
      type: "SET_TIMELINE";
      payload: { startDate?: string; endDate?: string; showOverdue?: boolean };
    }
  // risk categories
  | { type: "ADD_CATEGORY_SUB"; payload: string }
  | { type: "REMOVE_CATEGORY_SUB"; payload: string }
  // refresh filters
  | { type: "REFRESH_DATA"; payload: string }
  // apply filters
  | { type: "APPLY_FILTERS" }
  // clear and apply filters
  | { type: "CLEAR_AND_APPLY" }
  // clear all
  | { type: "CLEAR_ALL" };

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type SidebarFooterProps = {
  onRefresh: () => void;
};

export type SidebarHeaderProps = {
  onClose: () => void;
};

export interface FilterContextType {
  state: FilterState;
  appliedState: FilterState;
  dispatch: React.Dispatch<Action>;
  applyFilters: () => void;
  clearAndApplyFilters: () => void;
  removeAndApplyFilter: (
    type:
      | "planTasksStatus"
      | "level"
      | "quickFilters"
      | "categories"
      | "timeline",
    label: string
  ) => void;
}
