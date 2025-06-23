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
      className="flex items-center justify-center flex-shrink-0 w-2 overflow-visible border-l border-r cursor-pointer transition-colors duration-200 bg-slate-100 border-slate-300 hover:bg-slate-200 touch-manipulation"
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
        <ChevronLeft className="w-3 h-3 rounded-l-full shadow-sm scale-200 text-slate-600 bg-slate-100" />
      ) : (
        <ChevronRight className="w-3 h-3 rounded-l-full shadow-sm scale-200 text-slate-600 bg-slate-100" />
      )}
    </div>
  );
};
