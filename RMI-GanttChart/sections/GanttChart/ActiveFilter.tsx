"use client";

import { LuX } from "react-icons/lu";
import { useFilter } from "../Sidebar/FilterHook/FilterContext/FilterContext";
import { Badge } from "../../components/FilterBadge";

const ActiveFilter = () => {
  const { state, clearAndApplyFilters, removeAndApplyFilter } = useFilter();

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
      ? quickOnlySet.has("This Month")
        ? []
        : [
            {
              type: "timeline" as const,
              label:
                state.timeline.startDate && state.timeline.endDate
                  ? `From ${state.timeline.startDate} to ${state.timeline.endDate}`
                  : state.timeline.startDate
                  ? `Since ${state.timeline.startDate}`
                  : state.timeline.endDate
                  ? `Until ${state.timeline.endDate}`
                  : "",
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
    removeAndApplyFilter(type, label);
  };

  const handleClearAll = () => {
    clearAndApplyFilters();
  };

  return (
    <>
      {allFilters.length > 0 && (
        <div className="flex flex-col w-full h-auto gap-4 p-4 border border-blue-200 rounded-lg shadow-sm bg-blue-50 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col w-full sm:flex-row sm:items-center sm:gap-4">
            <p className="mb-1 font-semibold text-blue-700 shrink-0 sm:mb-0">
              Active Filters:
            </p>
            <div className="flex flex-wrap w-full gap-2">     
              {allFilters.map((filter) => (
                <Badge
                  key={`${filter.type}-${filter.label}`}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {filter.label}
                  <div
                    onClick={() => handleRemove(filter.type, filter.label)}
                    className="cursor-pointer"
                  >
                    <LuX className="w-3 h-3 ml-1" />
                  </div>
                </Badge>
              ))}
            </div>
          </div>

          {allFilters.length > 0 && (
            <button
              onClick={handleClearAll}
              className="w-full px-4 py-2 text-sm font-medium text-black transition-colors bg-white border border-gray-300 rounded-full sm:w-28 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ActiveFilter;
