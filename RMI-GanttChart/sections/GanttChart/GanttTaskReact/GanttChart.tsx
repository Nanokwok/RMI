"use client";

import type React from "react";
import { useState } from "react";
import { Gantt, type Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { TaskListHeader } from "./TaskListHeader";
import { TaskListTable } from "./TaskListTable";
import { convertToGanttTasks } from "./utils";
import { useAppliedFilteredPlans } from "../../Sidebar/FilterHook/useAppliedFilteredPlans";
import { EmptyState } from "./EmptyState";
import { useFilter } from "../../Sidebar/FilterHook/FilterContext/FilterContext";

export const GanttChart: React.FC = () => {
  const filteredPlansFromSidebar = useAppliedFilteredPlans();

  const [expandedPlans, setExpandedPlans] = useState<string[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);

  const [planColumnWidth, setPlanColumnWidth] = useState(550);
  const [ownerColumnWidth, setOwnerColumnWidth] = useState(200);
  const [isPlanCollapsed, setIsPlanCollapsed] = useState(false);
  const [isOwnerCollapsed, setIsOwnerCollapsed] = useState(false);

  const DEFAULT_PLAN_WIDTH = 550;
  const DEFAULT_OWNER_WIDTH = 200;
  const COLLAPSED_PLAN_WIDTH = 300;
  const COLLAPSED_OWNER_WIDTH = 0;

  const togglePlanExpansion = (planId: string) => {
    setExpandedPlans((prev) =>
      prev.includes(planId)
        ? prev.filter((id) => id !== planId)
        : [...prev, planId]
    );
  };

  const togglePlanColumnWidth = () => {
    if (isPlanCollapsed) {
      setPlanColumnWidth(DEFAULT_PLAN_WIDTH);
      setIsPlanCollapsed(false);
    } else {
      setPlanColumnWidth(COLLAPSED_PLAN_WIDTH);
      setIsPlanCollapsed(true);
    }
  };

  const toggleOwnerColumnWidth = () => {
    if (isOwnerCollapsed) {
      setOwnerColumnWidth(DEFAULT_OWNER_WIDTH);
      setIsOwnerCollapsed(false);
    } else {
      setOwnerColumnWidth(COLLAPSED_OWNER_WIDTH);
      setIsOwnerCollapsed(true);
    }
  };

  const handlePlanDoubleClick = (planId: string) => {
    const plan = filteredPlansFromSidebar.find((p) => p.id === planId);
    if (plan && plan.tasks.length > 0) {
      setSelectedPlanId(planId);
      setIsDetailView(true);
      setExpandedPlans([planId]);
    }
  };

  const handleBackToAllPlans = () => {
    setIsDetailView(false);
    setSelectedPlanId(null);
  };

  const getFilteredPlans = () => {
    if (isDetailView && selectedPlanId) {
      const selectedPlan = filteredPlansFromSidebar.find(
        (p) => p.id === selectedPlanId
      );
      return selectedPlan ? [selectedPlan] : [];
    }
    return filteredPlansFromSidebar;
  };

  const filteredPlans = getFilteredPlans();
  const tasks = convertToGanttTasks(filteredPlans, expandedPlans);

  const { dispatch } = useFilter();

  const handleClearFilters = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  // Add check for empty results (replace the existing empty check)
  if (filteredPlans.length === 0) {
    return <EmptyState onClearFilters={handleClearFilters} />;
  }

  const handleTaskDoubleClick = (task: Task) => {
    if (!task.project) {
      const plan = filteredPlansFromSidebar.find((p) => p.id === task.id);
      if (plan && plan.tasks.length > 0) {
        handlePlanDoubleClick(task.id);
      }
    }
  };

  return (
    <div className="w-auto h-full overflow-auto bg-white border shadow-sm border-slate-200">
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Month}
        columnWidth={100}
        rowHeight={190}
        headerHeight={50}
        barCornerRadius={10}
        fontSize="16px"
        onDoubleClick={handleTaskDoubleClick}
        TaskListHeader={() => (
          <TaskListHeader
            planColumnWidth={planColumnWidth}
            ownerColumnWidth={ownerColumnWidth}
            isDetailView={isDetailView}
            selectedPlanName={
              selectedPlanId
                ? filteredPlansFromSidebar.find((p) => p.id === selectedPlanId)
                    ?.name
                : undefined
            }
            onBackClick={handleBackToAllPlans}
          />
        )}
        TaskListTable={() => (
          <TaskListTable
            tasks={tasks}
            plans={filteredPlans}
            expandedPlans={expandedPlans}
            planColumnWidth={planColumnWidth}
            ownerColumnWidth={ownerColumnWidth}
            togglePlanExpansion={togglePlanExpansion}
            onTogglePlanWidth={togglePlanColumnWidth}
            onToggleOwnerWidth={toggleOwnerColumnWidth}
            isPlanCollapsed={isPlanCollapsed}
            isOwnerCollapsed={isOwnerCollapsed}
            setPlanColumnWidth={setPlanColumnWidth}
            setOwnerColumnWidth={setOwnerColumnWidth}
          />
        )}
        TooltipContent={({ task }: { task: Task }) => {
          const plan = filteredPlansFromSidebar.find(
            (p) => p.id === task.id || p.id === task.project
          );
          const taskData = filteredPlansFromSidebar
            .flatMap((p) => p.tasks)
            .find((t) => t.id === task.id);
          const isParent = !task.project;
          const hasSubTasks = isParent && plan && plan.tasks.length > 0;

          return (
            <div className="max-w-xs p-3 text-base bg-white border rounded-lg shadow-lg border-slate-200">
              <div className="mb-1 font-semibold text-slate-900">
                {isParent ? "Plan" : "Task"}:{" "}
                {isParent ? plan?.name : taskData?.name}
              </div>
              <div className="mb-1 text-slate-700">
                <strong>Progress:</strong> {task.progress}%
              </div>
              <div className="mb-1 text-slate-700">
                <strong>Start:</strong> {task.start.toLocaleDateString()}
              </div>
              <div className="mb-1 text-slate-700">
                <strong>End:</strong> {task.end.toLocaleDateString()}
              </div>
              {plan && isParent && (
                <>
                  <div className="mb-1 text-slate-700">
                    <strong>Owner:</strong> {plan.owner}
                  </div>
                  <div className="mb-1 text-slate-700">
                    <strong>Risk:</strong> {plan.linkedRisk}
                  </div>
                  <div className="mb-1 text-slate-700">
                    <strong>Risk Category:</strong> {plan.riskCategory}
                  </div>
                </>
              )}
              {taskData && (
                <div className="mb-1 text-slate-700">
                  <strong>Assignee:</strong> {taskData.assignee}
                </div>
              )}
              {hasSubTasks && !isDetailView && (
                <div className="pt-2 mt-2 text-sm font-medium text-blue-600 border-t border-slate-200">
                  Double click to see plan detail
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};
