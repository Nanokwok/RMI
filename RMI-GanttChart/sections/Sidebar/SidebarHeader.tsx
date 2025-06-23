import { LuX } from "react-icons/lu";
import { MdOutlineFilterAlt } from "react-icons/md";
import { Badge } from "../../components/FilterBadge";
import { useFilter } from "./FilterContext";
import type { SidebarHeaderProps } from "../../types/sidebar-filter-types";

const SidebarHeader = ({ onClose }: SidebarHeaderProps) => {
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
    ...(state.timeline.showOverdue
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
    <div className="flex flex-col space-y-1.5 p-6 bg-blue-50 border-b border-slate-200">
      <div className="flex items-center justify-between">
        <p className="flex items-center text-2xl font-semibold gap-2">
          <MdOutlineFilterAlt className="w-6 h-6" />
          Risks Filters
        </p>
        <button onClick={onClose} className="text-sm font-medium text-black">
          <LuX className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-wrap items-center mt-2 gap-2">
        <Badge variant="primary">
          {allFilters.length} Active filter{allFilters.length !== 1 ? "s" : ""}
        </Badge>

        {allFilters.map((filter) => (
          <Badge
            key={`${filter.type}-${filter.label}`}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {filter.label}
            <button onClick={() => handleRemove(filter.type, filter.label)}>
              <LuX className="w-2.5 h-2.5" />
            </button>
          </Badge>
        ))}

        {allFilters.length > 0 && (
          <button
            onClick={handleClearAll}
            className="h-10 gap-2 ml-auto bg-white hover:bg-gray-100 text-black inline-flex items-center justify-center text-sm font-medium border border-gray-300 rounded-full px-3 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default SidebarHeader;
