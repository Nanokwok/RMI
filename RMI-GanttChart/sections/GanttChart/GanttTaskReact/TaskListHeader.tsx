"use client";

import type React from "react";
import { ArrowLeft } from "lucide-react";
import type { TaskListHeaderProps } from "../../../types/gantt-task-types";

export const TaskListHeader: React.FC<TaskListHeaderProps> = ({
  planColumnWidth,
  ownerColumnWidth,
  isDetailView = false,
  selectedPlanName,
  onBackClick,
}) => (
  <div className="h-[50px] flex bg-slate-50 border-b border-slate-300 font-semibold text-base text-slate-700">
    <div
      className="flex items-center pl-4 border-r border-slate-300 overflow-hidden transition-all duration-300"
      style={{ width: planColumnWidth }}
    >
      {isDetailView ? (
        <div className="flex items-center gap-3 min-w-0">
          <div
            onClick={onBackClick}
            className="h-8 px-2 flex items-center cursor-pointer hover:bg-slate-100 transition-colors duration-200 flex-shrink-0 rounded"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
          </div>
          <span className="text-sm text-slate-400 flex-shrink-0">|</span>
          <span className="truncate text-slate-800" title={selectedPlanName}>
            {selectedPlanName}
          </span>
        </div>
      ) : (
        "Plan"
      )}
    </div>
    <div className="w-2 bg-slate-100 flex-shrink-0 border-l border-r border-slate-300" />
    <div
      className="flex items-center justify-center border-l border-slate-200 overflow-hidden transition-all duration-300"
      style={{ width: ownerColumnWidth }}
    >
      Owner
    </div>
    <div className="w-2 bg-slate-100 flex-shrink-0 border-l border-r border-slate-300" />
  </div>
);
