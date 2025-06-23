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

        const matchPlan =
          plan.status?.trim().toLowerCase() === normalizedFilterStatus;
        const matchAnyTask = plan.tasks.some(
          (task) => task.status?.trim().toLowerCase() === normalizedFilterStatus
        );

        return matchPlan || matchAnyTask;
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

    // Filter by timeline
    if (timeline.showOverdue) {
      const hasOverdueTask = plan.tasks.filter((task) => {
        task.status === "Delayed";
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
      if (!plan.categories || plan.categories.length === 0) return false;

      const hasMatchingCategory = categories.some((category) => {
        const [catName, subName] = category.split(" - ").map((s) => s?.trim());
        return plan.categories.some((planCat: any) => {
          const categoryMatch = planCat.category?.trim() === catName;
          const subCategoryMatch =
            !subName || planCat.subCategory?.trim() === subName;
          return categoryMatch && subCategoryMatch;
        });
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
