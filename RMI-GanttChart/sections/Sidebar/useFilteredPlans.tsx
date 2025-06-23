import { useFilter } from "./FilterContext";
import { initialPlans } from "../../src/initialPlans";

export const useFilteredPlans = () => {
  const { state } = useFilter();

  console.log("Current filter state:", state);

  const filteredResults = initialPlans.filter((plan) => {
    const { planTasksStatus, level, quickFilters, timeline, categories } =
      state;

    // Filter by plan/task status
    if (planTasksStatus.length > 0) {
      const hasMatchingStatus = planTasksStatus.some((status) => {
        const normalizedFilterStatus = status.trim().toLowerCase();
        const normalizedPlanStatus = plan.status.trim().toLowerCase();

        // Check plan status
        if (normalizedPlanStatus === normalizedFilterStatus) return true;

        // Check task statuses
        return plan.tasks.some((task) => {
          const normalizedTaskStatus = task.status.trim().toLowerCase();
          return normalizedTaskStatus === normalizedFilterStatus;
        });
      });
      if (!hasMatchingStatus) return false;
    }

    // Filter by risk level
    if (level.length > 0) {
      const hasMatchingLevel = level.some((selectedLevel) => {
        const levelValue = selectedLevel.replace(" risk", "").trim();
        return plan.riskLevel?.trim() === levelValue;
      });
      if (!hasMatchingLevel) return false;
    }

    // Filter by quick filters
    if (quickFilters.length > 0) {
      const matchesQuickFilter = quickFilters.some((filter) => {
        switch (filter.trim()) {
          case "Critical & High risks":
            return (
              plan.riskLevel?.trim() === "Critical" ||
              plan.riskLevel?.trim() === "High"
            );

          case "Overdue Items":
            return plan.tasks.some((task) => {
              if (!task.dueDate) return false;
              return new Date(task.dueDate) < new Date();
            });

          case "This Month":
            const now = new Date();
            return plan.tasks.some((task) => {
              if (!task.dueDate) return false;
              const dueDate = new Date(task.dueDate);
              return (
                dueDate.getMonth() === now.getMonth() &&
                dueDate.getFullYear() === now.getFullYear()
              );
            });

          case "In progress":
            return plan.status?.trim().toLowerCase() === "in progress";

          default:
            return false;
        }
      });
      if (!matchesQuickFilter) return false;
    }

    // Filter by timeline
    if (timeline.showOverdue) {
      const hasOverdueTask = plan.tasks.some((task) => {
        if (!task.dueDate) return false;
        return new Date(task.dueDate) < new Date();
      });
      if (!hasOverdueTask) return false;
    }

    if (timeline.startDate) {
      const startDate = new Date(timeline.startDate);
      const planDate = new Date(plan.startDate);
      if (planDate < startDate) return false;
    }

    if (timeline.endDate) {
      const endDate = new Date(timeline.endDate);
      const planDate = new Date(plan.endDate);
      if (planDate > endDate) return false;
    }

    // Filter by categories
    if (categories.length > 0) {
      const hasMatchingCategory = categories.some((fullLabel) => {
        const parts = fullLabel.split(" - ");
        const subCategorySelected =
          parts.length > 1 ? parts[1].trim() : parts[0].trim();
        return plan.riskCategory?.trim() === subCategorySelected;
      });

      if (!hasMatchingCategory) return false;
    }

    return true;
  });

  console.log(
    `Filtered ${filteredResults.length} plans from ${initialPlans.length} total plans`
  );

  return filteredResults;
};

export default useFilteredPlans;
