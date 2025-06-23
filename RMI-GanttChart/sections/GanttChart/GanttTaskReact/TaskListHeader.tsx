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
      className="flex items-center pl-4 overflow-hidden border-r border-slate-300 transition-all duration-300"
      style={{ width: planColumnWidth }}
    >
      {isDetailView ? (
        <div className="flex items-center min-w-0 gap-3">
          <div
            onClick={onBackClick}
            className="flex items-center flex-shrink-0 h-8 px-2 rounded cursor-pointer hover:bg-slate-100 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
          </div>
          <span className="flex-shrink-0 text-sm text-slate-400">|</span>
          <span className="truncate text-slate-800" title={selectedPlanName}>
            {selectedPlanName}
          </span>
        </div>
      ) : (
        "Plan"
      )}
    </div>
    <div className="flex-shrink-0 w-2 border-l border-r bg-slate-100 border-slate-300" />
    <div
      className="flex items-center justify-center overflow-hidden border-l border-slate-200 transition-all duration-300"
      style={{ width: ownerColumnWidth }}
    >
      Owner
    </div>
    <div className="flex-shrink-0 w-2 border-l border-r bg-slate-100 border-slate-300" />
  </div>
);
