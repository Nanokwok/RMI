import type { GanttPlan } from "../../../types/gantt-task-types";
import { RiskCategory } from "../../Sidebar/filter_options";

export interface FilterState {
  planTasksStatus: string[];
  level: string[];
  timeline: {
    showOverdue: boolean;
    startDate?: string;
    endDate?: string;
  };
  categories: string[];
}

export function FilterPlans(
  plans: GanttPlan[],
  filterState: FilterState
): GanttPlan[] {
  return plans.filter((plan) => {
    const { planTasksStatus, level, timeline, categories } = filterState;

    // If no filters are applied, show all plans
    const hasAnyFilters =
      planTasksStatus.length > 0 ||
      level.length > 0 ||
      timeline.showOverdue ||
      timeline.startDate ||
      timeline.endDate ||
      categories.length > 0;

    if (!hasAnyFilters) {
      return true;
    }

    let matchesAnyFilter = false;

    // Plan/task status filter
    if (planTasksStatus.length > 0) {
      const hasMatchingStatus = planTasksStatus.some((status) => {
        const normalizedFilterStatus = status.trim().toLowerCase();
        const matchPlan =
          plan.status?.trim().toLowerCase() === normalizedFilterStatus;
        const matchAnyTask = plan.tasks.some(
          (task) => task.status?.trim().toLowerCase() === normalizedFilterStatus
        );
        return matchPlan || matchAnyTask;
      });
      if (hasMatchingStatus) matchesAnyFilter = true;
    }

    // Risk level filter
    if (level.length > 0) {
      const hasMatchingLevel = level.some((selectedLevel) => {
        const levelValue = selectedLevel.replace(" risk", "").trim();
        return plan.riskLevel?.trim() === levelValue;
      });
      if (hasMatchingLevel) matchesAnyFilter = true;
    }

    // Timeline filter
    if (timeline.showOverdue) {
      const hasOverdueTask = plan.tasks.some((task) => {
        return task.status === "Delayed";
      });
      if (hasOverdueTask) matchesAnyFilter = true;
    }

    if (timeline.startDate || timeline.endDate) {
      let matchesTimelineFilter = true;

      if (timeline.startDate) {
        const startDate = new Date(timeline.startDate);
        const planDate = new Date(plan.startDate);
        if (planDate < startDate) matchesTimelineFilter = false;
      }

      if (timeline.endDate) {
        const endDate = new Date(timeline.endDate);
        const planDate = new Date(plan.endDate);
        if (planDate > endDate) matchesTimelineFilter = false;
      }

      if (matchesTimelineFilter) matchesAnyFilter = true;
    }

    // Category filter
    if (categories.length > 0) {
      const hasMatchingCategory = categories.some((filterLabel) => {
        const [group, sub] = filterLabel.split(" - ").map((s) => s.trim());

        if (!sub) {
          const groupData = RiskCategory.find((cat) => cat.name === group);
          if (!groupData) return false;

          return groupData.sub_category.some(
            (subCat) => subCat.name === plan.riskCategory
          );
        }

        return plan.riskCategory === sub;
      });

      if (!hasMatchingCategory) return false;

      matchesAnyFilter = true;
    }

    return matchesAnyFilter;
  });
}
