import type { FilterState } from "../../../../types/sidebar-filter-types";

export const initialState: FilterState = {
  planTasksStatus: [],
  level: [],
  quickFilters: [],
  timeline: {
    startDate: "",
    endDate: "",
    showOverdue: false,
  },
  categories: [],
};

export const initialAppliedState: FilterState = { ...initialState };
