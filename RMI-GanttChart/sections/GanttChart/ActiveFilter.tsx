import { LuX } from "react-icons/lu";
import { useFilter } from "../Sidebar/FilterContext";
import { Badge } from "../../components/FilterBadge";

const ActiveFilter = () => {
  const { state, dispatch } = useFilter();

  const quickOnlySet = new Set(state.quickFilters);

  const levelFilterHidden = (label: string) => {
    if (
      quickOnlySet.has("Critical & High risks") &&
      (label === "Critical risk" || label === "High risk")
    ) {
      return true;
    }
    return false;
  };

  const allFilters = [
    // hide section badge if already selected in quick
    ...state.planTasksStatus
      .filter((label) => !quickOnlySet.has(label))
      .map((label) => ({ type: "planTasksStatus" as const, label })),
    ...state.level
      .filter((label) => !levelFilterHidden(label))
      .map((label) => ({ type: "level" as const, label })),
    ...state.quickFilters.map((label) => ({
      type: "quickFilters" as const,
      label,
    })),
    ...state.categories.map((label) => ({
      type: "categories" as const,
      label,
    })),
    ...(state.timeline.startDate || state.timeline.endDate
      ? [
          {
            type: "timeline" as const,
            label: `${state.timeline.startDate || "?"} - ${
              state.timeline.endDate || "?"
            }`,
          },
        ]
      : []),
    ...(state.timeline.showOverdue && !quickOnlySet.has("Overdue Items")
      ? [{ type: "timeline" as const, label: "Overdue only" }]
      : []),
  ];

  const handleRemove = (
    type:
      | "planTasksStatus"
      | "level"
      | "quickFilters"
      | "categories"
      | "timeline",
    label: string
  ) => {
    if (type === "timeline") {
      if (label === "Overdue only") {
        dispatch({ type: "SET_TIMELINE", payload: { showOverdue: false } });
      } else {
        dispatch({
          type: "SET_TIMELINE",
          payload: { startDate: "", endDate: "" },
        });
      }
    } else {
      dispatch({
        type:
          type === "planTasksStatus"
            ? "REMOVE_PLAN_TASK_STATUS"
            : type === "level"
            ? "REMOVE_LEVEL"
            : type === "quickFilters"
            ? "REMOVE_QUICK_FILTER"
            : "REMOVE_CATEGORY_SUB",
        payload: label,
      });
    }
  };

  const handleClearAll = () => dispatch({ type: "CLEAR_ALL" });

  return (
    <div className="flex flex-col w-full h-auto p-4 border border-blue-200 rounded-lg gap-4 shadow-sm bg-blue-50 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col w-full sm:flex-row sm:items-center sm:gap-4">
        <p className="mb-1 font-semibold text-blue-700 shrink-0 sm:mb-0">
          Active Filters:
        </p>
        <div className="flex flex-wrap w-full gap-2">
          {allFilters.length === 0 && (
            <p className="text-sm text-blue-300">No active filters</p>
          )}
          {allFilters.map((filter) => (
            <Badge
              key={`${filter.type}-${filter.label}`}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filter.label}
              <button
                onClick={() => handleRemove(filter.type, filter.label)}
                className="ml-1"
              >
                <LuX className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {allFilters.length > 0 && (
        <button
          onClick={handleClearAll}
          className="w-full px-4 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-full transition-colors sm:w-28 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default ActiveFilter;
