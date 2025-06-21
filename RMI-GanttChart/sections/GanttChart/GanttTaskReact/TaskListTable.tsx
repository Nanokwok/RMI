"use client";

import type React from "react";
import type { TaskListTableProps } from "../../../types/gantt-task-types";
import { TaskRow } from "../GanttTaskReact/TaskRow/TaskRow";
import { OwnerColumn } from "../../GanttChart/GanttTaskReact/TaskRow/OwnerColumn";
import { ToggleButton } from "./ToggleButton";

export const TaskListTable: React.FC<TaskListTableProps> = ({
  tasks,
  plans,
  expandedPlans,
  planColumnWidth,
  ownerColumnWidth,
  togglePlanExpansion,
  onTogglePlanWidth,
  onToggleOwnerWidth,
  isPlanCollapsed,
  isOwnerCollapsed,
}) => {
  return (
    <div className="bg-white flex w-full relative">
      <div
        className="bg-white relative overflow-hidden transition-all duration-300"
        style={{ width: planColumnWidth }}
      >
        {tasks.map((task) => {
          const plan = plans.find((p) => p.id === task.id);
          const taskData = plans
            .flatMap((p) => p.tasks)
            .find((t) => t.id === task.id);
          const isParent = !task.project;
          const isExpanded = expandedPlans.includes(task.id);
          const hasSubTasks = (plan && plan.tasks.length > 0) ?? false;

          return (
            <TaskRow
              key={task.id}
              task={task}
              plan={plan}
              taskData={taskData}
              isParent={isParent}
              isExpanded={isExpanded}
              hasSubTasks={hasSubTasks}
              onToggleExpand={() => togglePlanExpansion(task.id)}
            />
          );
        })}
      </div>

      <ToggleButton
        direction="left"
        onClick={onTogglePlanWidth}
        isCollapsed={isPlanCollapsed}
      />
      <OwnerColumn tasks={tasks} plans={plans} width={ownerColumnWidth} />
      <ToggleButton
        direction="right"
        onClick={onToggleOwnerWidth}
        isCollapsed={isOwnerCollapsed}
      />
    </div>
  );
};
