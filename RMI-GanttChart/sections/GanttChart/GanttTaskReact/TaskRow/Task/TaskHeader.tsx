import React from "react";
import { ExpandButton } from "../../../../../components/ExpandButton";
import { Badge } from "../../../../../components/GanttStatusBadge";

interface TaskHeaderProps {
  name: string;
  status: string;
  taskCount: number;
  hasSubTasks: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({
  name,
  status,
  taskCount,
  hasSubTasks,
  isExpanded,
  onToggleExpand,
}) => (
  <div className="flex items-center justify-between mb-1 gap-4">
    <div className="flex items-start flex-1 min-w-0">
      {hasSubTasks ? (
        <ExpandButton isExpanded={isExpanded} onClick={onToggleExpand} />
      ) : (
        <div className="flex-shrink-0 w-6 mr-2" />
      )}
      <span
        onClick={hasSubTasks ? onToggleExpand : undefined}
        className={`font-semibold text-base text-gray-900 leading-snug overflow-hidden flex-1 line-clamp-2 ${
          hasSubTasks
            ? "cursor-pointer select-none hover:underline"
            : "cursor-default"
        }`}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {name}
      </span>
    </div>
    <Badge
      status={status}
      className="!bg-purple-100 !text-purple-600 !px-3 py-0.5 rounded-md"
    >
      {taskCount === 0
        ? "No Task"
        : `${taskCount} Task${taskCount > 1 ? "s" : ""}`}
    </Badge>
  </div>
);
