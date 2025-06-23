import { createContext, useReducer, useContext } from "react";
import type { FilterState, Action } from "../../types/sidebar-filter-types";
import { format, startOfMonth, endOfMonth } from "date-fns";

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
    case "TOGGLE_LEVEL": {
      const isChecked = state.level.includes(action.payload);
      const updatedLevel = isChecked
        ? state.level.filter((l) => l !== action.payload)
        : [...state.level, action.payload];

      const hasCritical = updatedLevel.includes("Critical risk");
      const hasHigh = updatedLevel.includes("High risk");

      const updatedQuickFilters = [...state.quickFilters];
      const quickLabel = "Critical & High risks";

      const shouldAddQuick = hasCritical && hasHigh;
      const alreadyHasQuick = updatedQuickFilters.includes(quickLabel);
      return {
        ...state,
        level: updatedLevel,
        quickFilters: shouldAddQuick
          ? alreadyHasQuick
            ? updatedQuickFilters
            : [...updatedQuickFilters, quickLabel]
          : updatedQuickFilters.filter((q) => q !== quickLabel),
      };
    }
    case "REMOVE_LEVEL": {
      const updatedLevel = state.level.filter((l) => l !== action.payload);
      const hasCritical = updatedLevel.includes("Critical risk");
      const hasHigh = updatedLevel.includes("High risk");

      return {
        ...state,
        level: updatedLevel,
        quickFilters:
          hasCritical && hasHigh
            ? state.quickFilters
            : state.quickFilters.filter((q) => q !== "Critical & High risks"),
      };
    }

    // quick filters
    case "TOGGLE_QUICK_FILTER": {
      const isActive = state.quickFilters.includes(action.payload);
      const updatedQuick = isActive
        ? state.quickFilters.filter((q) => q !== action.payload)
        : [...state.quickFilters, action.payload];

      let updatedPlan = [...state.planTasksStatus];
      if (action.payload === "In progress") {
        updatedPlan = isActive
          ? updatedPlan.filter((p) => p !== "In progress")
          : [...new Set([...updatedPlan, "In progress"])];
      }

      let updatedLevel = [...state.level];
      if (action.payload === "Critical & High risks") {
        updatedLevel = isActive
          ? updatedLevel.filter(
              (l) => l !== "Critical risk" && l !== "High risk"
            )
          : Array.from(
              new Set([...updatedLevel, "Critical risk", "High risk"])
            );
      }

      const updatedTimeline = {
        ...state.timeline,
        showOverdue:
          action.payload === "Overdue Items"
            ? !isActive
            : state.timeline.showOverdue,
      };

      if (action.payload === "This Month") {
        const now = new Date();
        const thisMonthStart = format(startOfMonth(now), "yyyy-MM-dd");
        const thisMonthEnd = format(endOfMonth(now), "yyyy-MM-dd");

        updatedTimeline.startDate = isActive ? "" : thisMonthStart;
        updatedTimeline.endDate = isActive ? "" : thisMonthEnd;
      }
      return {
        ...state,
        quickFilters: updatedQuick,
        planTasksStatus: updatedPlan,
        level: updatedLevel,
        timeline: updatedTimeline,
      };
    }
    case "REMOVE_QUICK_FILTER": {
      let updatedLevel = [...state.level];
      if (action.payload === "Critical & High risks") {
        updatedLevel = updatedLevel.filter(
          (l) => l !== "Critical risk" && l !== "High risk"
        );
      }

      let updatedPlan = [...state.planTasksStatus];
      if (action.payload === "In progress") {
        updatedPlan = updatedPlan.filter((p) => p !== "In progress");
      }

      let updatedTimeline = { ...state.timeline };
      if (action.payload === "Overdue Items") {
        updatedTimeline.showOverdue = false;
      }

      if (action.payload === "This Month") {
        updatedTimeline.startDate = "";
        updatedTimeline.endDate = "";
      }

      return {
        ...state,
        quickFilters: state.quickFilters.filter((q) => q !== action.payload),
        level: updatedLevel,
        planTasksStatus: updatedPlan,
        timeline: updatedTimeline,
      };
    }

    // timeline
    case "SET_TIMELINE": {
      const payload = action.payload;
      let updatedQuick = [...state.quickFilters];

      const thisMonthStart = format(startOfMonth(new Date()), "yyyy-MM-dd");
      const thisMonthEnd = format(endOfMonth(new Date()), "yyyy-MM-dd");

      if (payload.showOverdue === false) {
        updatedQuick = updatedQuick.filter((q) => q !== "Overdue Items");
      }
      if (payload.showOverdue === true) {
        if (!updatedQuick.includes("Overdue Items")) {
          updatedQuick.push("Overdue Items");
        }
      }

      const nextStart = payload.startDate ?? state.timeline.startDate;
      const nextEnd = payload.endDate ?? state.timeline.endDate;

      const isExactlyThisMonth =
        nextStart === thisMonthStart && nextEnd === thisMonthEnd;

      if (isExactlyThisMonth) {
        if (!updatedQuick.includes("This Month")) {
          updatedQuick.push("This Month");
        }
      } else {
        updatedQuick = updatedQuick.filter((q) => q !== "This Month");
      }

      return {
        ...state,
        timeline: {
          ...state.timeline,
          ...payload,
        },
        quickFilters: updatedQuick,
      };
    }

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
