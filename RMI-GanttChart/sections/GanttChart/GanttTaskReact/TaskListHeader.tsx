"use client";

import type React from "react";
import { ArrowLeft } from "lucide-react";

interface TaskListHeaderProps {
  showOwnerColumn: boolean;
  isDetailView?: boolean;
  selectedPlanName?: string;
  onBackClick?: () => void;
}

export const TaskListHeader: React.FC<TaskListHeaderProps> = ({
  showOwnerColumn,
  isDetailView = false,
  selectedPlanName,
  onBackClick,
}) => (
  <div className="h-[50px] flex bg-slate-50 border-b border-gray-300 font-semibold text-base text-gray-700 group">
    <div
      className={`${
        showOwnerColumn ? "flex-1" : "w-full"
      } flex items-center pl-4 border-r border-gray-300`}
    >
      {isDetailView ? (
        <div className="flex items-center gap-3">
          <div
            onClick={onBackClick}
            className="h-8 px-2 flex items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
          </div>
          <span className="text-sm text-gray-600">|</span>
          <span className="truncate max-w-[400px]" title={selectedPlanName}>
            {selectedPlanName}
          </span>
        </div>
      ) : (
        "Plan"
      )}
    </div>
    {showOwnerColumn && (
      <div className="w-[200px] flex items-center justify-center border-l border-gray-200 relative group">
        Owner
      </div>
    )}
  </div>
);
