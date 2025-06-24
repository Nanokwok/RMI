import { format, startOfMonth, endOfMonth } from "date-fns";
import type {
  FilterState,
  Action,
} from "../../../../types/sidebar-filter-types";
import { initialState } from "./filter-constants";

export function filterReducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case "TOGGLE_PLAN_TASK_STATUS": {
      const isInProgress = action.payload === "In progress";
      const isDelayed = action.payload === "Delayed";
      const isChecked = state.planTasksStatus.includes(action.payload);

      let updatedQuick = [...state.quickFilters];
      if (isInProgress) {
        updatedQuick = isChecked
          ? updatedQuick.filter((q) => q !== "In progress")
          : [...updatedQuick, "In progress"];
      }
      if (isDelayed) {
        updatedQuick = isChecked
          ? updatedQuick.filter((q) => q !== "Overdue Items")
          : [...updatedQuick, "Overdue Items"];
      }

      return {
        ...state,
        planTasksStatus: isChecked
          ? state.planTasksStatus.filter((s) => s !== action.payload)
          : [...state.planTasksStatus, action.payload],
        quickFilters: updatedQuick,
        timeline: isDelayed
          ? {
              ...state.timeline,
              showOverdue: !isChecked,
            }
          : state.timeline,
      };
    }

    case "REMOVE_PLAN_TASK_STATUS": {
      const isInProgress = action.payload === "In progress";
      const isDelayed = action.payload === "Delayed";

      return {
        ...state,
        planTasksStatus: state.planTasksStatus.filter(
          (s) => s !== action.payload
        ),
        quickFilters: state.quickFilters.filter((q) =>
          isInProgress
            ? q !== "In progress"
            : isDelayed
            ? q !== "Overdue Items"
            : true
        ),
        timeline: isDelayed
          ? {
              ...state.timeline,
              showOverdue: false,
            }
          : state.timeline,
      };
    }

    case "TOGGLE_LEVEL": {
      const isChecked = state.level.includes(action.payload);
      const updatedLevel = isChecked
        ? state.level.filter((l) => l !== action.payload)
        : [...state.level, action.payload];

      const hasCritical = updatedLevel.includes("Critical risk");
      const hasHigh = updatedLevel.includes("High risk");

      const quickLabel = "Critical & High risks";
      const shouldAddQuick = hasCritical && hasHigh;

      return {
        ...state,
        level: updatedLevel,
        quickFilters: shouldAddQuick
          ? [...new Set([...state.quickFilters, quickLabel])]
          : state.quickFilters.filter((q) => q !== quickLabel),
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

    case "TOGGLE_QUICK_FILTER": {
      const isActive = state.quickFilters.includes(action.payload);
      const updatedQuick = isActive
        ? state.quickFilters.filter((q) => q !== action.payload)
        : [...state.quickFilters, action.payload];

      let updatedPlan = [...state.planTasksStatus];
      let updatedLevel = [...state.level];
      const updatedTimeline = { ...state.timeline };

      if (action.payload === "In progress") {
        updatedPlan = isActive
          ? updatedPlan.filter((p) => p !== "In progress")
          : [...new Set([...updatedPlan, "In progress"])];
      }

      if (action.payload === "Critical & High risks") {
        updatedLevel = isActive
          ? updatedLevel.filter(
              (l) => l !== "Critical risk" && l !== "High risk"
            )
          : Array.from(
              new Set([...updatedLevel, "Critical risk", "High risk"])
            );
      }

      if (action.payload === "Overdue Items") {
        updatedTimeline.showOverdue = !isActive;
        updatedPlan = isActive
          ? updatedPlan.filter((p) => p !== "Delayed")
          : [...new Set([...updatedPlan, "Delayed"])];
      }

      if (action.payload === "This Month") {
        const now = new Date();
        updatedTimeline.startDate = isActive
          ? ""
          : format(startOfMonth(now), "yyyy-MM-dd");
        updatedTimeline.endDate = isActive
          ? ""
          : format(endOfMonth(now), "yyyy-MM-dd");
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
      let updatedPlan = [...state.planTasksStatus];
      const updatedTimeline = { ...state.timeline };

      if (action.payload === "Critical & High risks") {
        updatedLevel = updatedLevel.filter(
          (l) => l !== "Critical risk" && l !== "High risk"
        );
      }

      if (action.payload === "In progress") {
        updatedPlan = updatedPlan.filter((p) => p !== "In progress");
      }

      if (action.payload === "Overdue Items") {
        updatedPlan = updatedPlan.filter((p) => p !== "Delayed");
        updatedTimeline.showOverdue = false;
      }

      if (action.payload === "This Month") {
        updatedTimeline.startDate = "";
        updatedTimeline.endDate = "";
      }

      return {
        ...state,
        quickFilters: state.quickFilters.filter((q) => q !== action.payload),
        planTasksStatus: updatedPlan,
        level: updatedLevel,
        timeline: updatedTimeline,
      };
    }

    case "SET_TIMELINE": {
      const payload = action.payload;
      let updatedQuick = [...state.quickFilters];
      let updatedPlan = [...state.planTasksStatus];
      const updatedLevel = [...state.level];

      const thisMonthStart = format(startOfMonth(new Date()), "yyyy-MM-dd");
      const thisMonthEnd = format(endOfMonth(new Date()), "yyyy-MM-dd");

      if (payload.showOverdue === true) {
        if (!updatedQuick.includes("Overdue Items")) {
          updatedQuick.push("Overdue Items");
        }
        if (!updatedPlan.includes("Delayed")) {
          updatedPlan.push("Delayed");
        }
      } else {
        updatedQuick = updatedQuick.filter((q) => q !== "Overdue Items");
        updatedPlan = updatedPlan.filter((p) => p !== "Delayed");
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
        quickFilters: updatedQuick,
        planTasksStatus: updatedPlan,
        level: updatedLevel,
        timeline: {
          ...state.timeline,
          ...payload,
        },
      };
    }

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

    case "CLEAR_ALL":
      return { ...initialState };

    case "APPLY_FILTERS":
      return state;

    case "CLEAR_AND_APPLY":
      return { ...initialState };

    default:
      return state;
  }
}
