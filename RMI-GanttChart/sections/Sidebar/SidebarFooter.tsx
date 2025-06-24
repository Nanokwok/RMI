"use client";

import { RefreshCw } from "lucide-react";
import type { SidebarFooterProps } from "../../types/sidebar-filter-types";
import { useFilteredPlans } from "./FilterHook/useFilteredPlans";
import { useAppliedFilteredPlans } from "./FilterHook/useAppliedFilteredPlans";
import { initialPlans } from "../../src/initialPlans";
import { useFilter } from "./FilterHook/FilterContext/FilterContext";

const SidebarFooter = ({ onRefresh }: SidebarFooterProps) => {
  const { applyFilters } = useFilter();
  const currentFilteredPlans = useFilteredPlans();
  const appliedFilteredPlans = useAppliedFilteredPlans();
  const totalPlans = initialPlans.length;

  const handleRefresh = () => {
    applyFilters();
    onRefresh?.();
  };

  const showingCount = appliedFilteredPlans.length;
  const pendingCount = currentFilteredPlans.length;
  const hasChanges = showingCount !== pendingCount;

  return (
    <div className="flex flex-col justify-start flex-1 p-6 bg-gray-50">
      <div className="flex items-center justify-between pb-4 text-sm text-gray-600">
        <span className="font-medium">
          Showing {showingCount} of {totalPlans} item
          {totalPlans !== 1 ? "s" : ""}
        </span>
        {hasChanges && (
          <span className="text-xs text-blue-600">
            ({pendingCount} pending)
          </span>
        )}
      </div>

      <button
        onClick={handleRefresh}
        className={`inline-flex items-center justify-center w-full h-10 gap-2 px-4 py-2 text-base font-medium border border-input bg-background hover:bg-gray-100 ${
          hasChanges
            ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
            : "bg-white"
        }`}
        style={{
          borderColor: hasChanges ? "rgb(147, 197, 253)" : "rgb(226, 232, 240)",
        }}
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh Data
      </button>
    </div>
  );
};

export default SidebarFooter;
