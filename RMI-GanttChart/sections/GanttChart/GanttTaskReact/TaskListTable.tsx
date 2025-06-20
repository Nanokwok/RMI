import React from "react";
import type { Task } from "gantt-task-react";
import type { GanttPlan } from "../../../types/gantt-task-types";
import { TaskRow } from "../GanttTaskReact/TaskRow/TaskRow";
import { OwnerColumn } from "../../GanttChart/GanttTaskReact/TaskRow/OwnerColumn";
import { ColumnToggle } from "../../GanttChart/GanttTaskReact/TaskRow/ColumnToggle";

interface TaskListTableProps {
  tasks: Task[];
  plans: GanttPlan[];
  expandedPlans: string[];
  showOwnerColumn: boolean;
  isHoveringColumnEdge: boolean;
  togglePlanExpansion: (planId: string) => void;
  toggleOwnerColumn: () => void;
  setIsHoveringColumnEdge: (isHovering: boolean) => void;
}

export const TaskListTable: React.FC<TaskListTableProps> = ({
  tasks,
  plans,
  expandedPlans,
  showOwnerColumn,
  isHoveringColumnEdge,
  togglePlanExpansion,
  toggleOwnerColumn,
  setIsHoveringColumnEdge,
}) => {
  return (
    <div className="bg-white flex w-full relative">
      <div
        className={`${
          showOwnerColumn ? "flex-1" : "w-[550px]"
        } bg-white relative`}
        onMouseLeave={() => setIsHoveringColumnEdge(false)}
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

        <ColumnToggle
          showOwnerColumn={showOwnerColumn}
          isHovering={isHoveringColumnEdge}
          onToggle={toggleOwnerColumn}
          onHoverChange={setIsHoveringColumnEdge}
        />
      </div>

      <OwnerColumn
        tasks={tasks}
        plans={plans}
        showOwnerColumn={showOwnerColumn}
      />
    </div>
  );
};
