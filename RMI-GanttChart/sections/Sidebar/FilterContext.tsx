import { createContext, useReducer, useContext } from "react";
import type { FilterState, Action } from "../../types/sidebar-filter-types";

const initialState: FilterState = {
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

function reducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    // plan tasks status
    case "TOGGLE_PLAN_TASK_STATUS":
      console.log("Toggling plan task status:", action.payload);
      return {
        ...state,
        planTasksStatus: state.planTasksStatus.includes(action.payload)
          ? state.planTasksStatus.filter((s) => s !== action.payload)
          : [...state.planTasksStatus, action.payload],
      };
    case "REMOVE_PLAN_TASK_STATUS":
      console.log("Removing plan task status:", action.payload);
      return {
        ...state,
        planTasksStatus: state.planTasksStatus.filter(
          (s) => s !== action.payload
        ),
      };
    // risk level
    case "TOGGLE_LEVEL":
      console.log("Toggling risk level:", action.payload);
      return {
        ...state,
        level: state.level.includes(action.payload)
          ? state.level.filter((l) => l !== action.payload)
          : [...state.level, action.payload],
      };
    case "REMOVE_LEVEL":
      return {
        ...state,
        level: state.level.filter((l) => l !== action.payload),
      };

    // quick filters
    case "TOGGLE_QUICK_FILTER":
      console.log("Toggling quick filter:", action.payload);
      return {
        ...state,
        quickFilters: state.quickFilters.includes(action.payload)
          ? state.quickFilters.filter((q) => q !== action.payload)
          : [...state.quickFilters, action.payload],
      };
    case "REMOVE_QUICK_FILTER":
      return {
        ...state,
        quickFilters: state.quickFilters.filter((q) => q !== action.payload),
      };

    // timeline
    case "SET_TIMELINE":
      return {
        ...state,
        timeline: {
          ...state.timeline,
          ...action.payload,
        },
      };

    // risk categories
    case "ADD_CATEGORY_SUB":
      return {
        ...state,
        categories: [...new Set([...state.categories, action.payload])],
      };
    case "REMOVE_CATEGORY_SUB":
      return {
        ...state,
        categories: state.categories.filter((item) => item !== action.payload),
      };

    // clear all
    case "CLEAR_ALL":
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

const FilterContext = createContext<{
  state: FilterState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
