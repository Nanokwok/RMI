"use client";

import type React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ToggleButtonProps } from "../../../types/gantt-task-types";

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  direction,
  onClick,
  isCollapsed = false,
}) => {
  const showLeftArrow = !isCollapsed;
  return (
    <div
      onClick={onClick}
      className="overflow-visible w-2 bg-slate-100 border-l border-r border-slate-300 flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors duration-200 flex-shrink-0 touch-manipulation"
      title={
        direction === "left"
          ? isCollapsed
            ? "Expand plan column"
            : "Collapse plan column"
          : isCollapsed
          ? "Expand owner column"
          : "Collapse owner column"
      }
    >
      {showLeftArrow ? (
        <ChevronLeft className="w-3 h-3 scale-200 text-slate-600 bg-slate-100 rounded-l-full shadow-sm" />
      ) : (
        <ChevronRight className="w-3 h-3 scale-200 text-slate-600 bg-slate-100 rounded-l-full shadow-sm" />
      )}
    </div>
  );
};
