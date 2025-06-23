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
    case "TOGGLE_PLAN_TASK_STATUS": {
      const isInProgress = action.payload === "In progress";
      const isChecked = state.planTasksStatus.includes(action.payload);
      return {
        ...state,
        planTasksStatus: isChecked
          ? state.planTasksStatus.filter((s) => s !== action.payload)
          : [...state.planTasksStatus, action.payload],
        quickFilters: isInProgress
          ? isChecked
            ? state.quickFilters.filter((q) => q !== "In progress")
            : [...state.quickFilters, "In progress"]
          : state.quickFilters,
      };
    }

    case "REMOVE_PLAN_TASK_STATUS": {
      const isInProgress = action.payload === "In progress";
      return {
        ...state,
        planTasksStatus: state.planTasksStatus.filter(
          (s) => s !== action.payload
        ),
        quickFilters: isInProgress
          ? state.quickFilters.filter((q) => q !== "In progress")
          : state.quickFilters,
      };
    }

    // risk level
    case "TOGGLE_LEVEL":
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
    case "TOGGLE_QUICK_FILTER": {
      const isActive = state.quickFilters.includes(action.payload);
      const updatedQuick = isActive
        ? state.quickFilters.filter((q) => q !== action.payload)
        : [...state.quickFilters, action.payload];

      // link quick -> section
      let updatedPlan = [...state.planTasksStatus];
      if (action.payload === "In progress") {
        updatedPlan = isActive
          ? updatedPlan.filter((p) => p !== "In progress")
          : [...new Set([...updatedPlan, "In progress"])];
      }

      return {
        ...state,
        quickFilters: updatedQuick,
        planTasksStatus: updatedPlan,
      };
    }

    case "REMOVE_QUICK_FILTER": {
      let updatedPlan = [...state.planTasksStatus];
      if (action.payload === "In progress") {
        updatedPlan = updatedPlan.filter((p) => p !== "In progress");
      }
      return {
        ...state,
        quickFilters: state.quickFilters.filter((q) => q !== action.payload),
        planTasksStatus: updatedPlan,
      };
    }

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
      return { ...initialState };

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
