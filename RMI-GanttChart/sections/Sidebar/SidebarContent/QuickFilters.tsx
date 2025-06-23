import { MockedQuick } from "../filter_options";
import { useFilter } from "../FilterContext";
import { initialPlans } from "../../../src/initialPlans";

const QuickFilters = () => {
  const { state, dispatch } = useFilter();

  const toggleQuick = (label: string) => {
    dispatch({ type: "TOGGLE_QUICK_FILTER", payload: label });
  };

  // Count the number of plans that match the quick filter criteria
  const getCount = (label: string): number => {
    const now = new Date();

    switch (label) {
      case "Critical & High risks":
        return initialPlans.filter(
          (plan) =>
            plan.riskLevel?.trim() === "Critical" ||
            plan.riskLevel?.trim() === "High"
        ).length;

      case "Overdue Items":
        return initialPlans.filter((plan) =>
          plan.tasks.some((task) => {
            if (!task.dueDate) return false;
            return new Date(task.dueDate) < now;
          })
        ).length;

      case "This Month":
        return initialPlans.filter((plan) => {
          if (!plan.startDate || !plan.endDate) return false;

          const start = new Date(plan.startDate);
          const end = new Date(plan.endDate);

          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          return (
            start.getMonth() === currentMonth &&
            start.getFullYear() === currentYear &&
            end.getMonth() === currentMonth &&
            end.getFullYear() === currentYear
          );
        }).length;

      case "In progress":
        return initialPlans.filter(
          (plan) => plan.status?.trim().toLowerCase() === "in progress"
        ).length;

      default:
        return 0;
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Quick Filters
      </label>
      <div className="flex flex-wrap mt-1 gap-1">
        {MockedQuick.map((filter) => {
          const isActive = state.quickFilters.includes(filter.label);
          const count = getCount(filter.label);

          return (
            <button
              key={filter.id}
              onClick={() => toggleQuick(filter.label)}
              className={`h-7 flex justify-center items-center text-sm font-semibold border rounded-md px-2 py-1 transition ${
                isActive
                  ? "!bg-blue-100 text-blue-700 border-blue-300"
                  : "bg-white hover:bg-gray-100 border-gray-300"
              }`}
            >
              <filter.icon className="w-4 h-4 mr-1" />
              {filter.label}
              <div className="ml-1 bg-gray-100 inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold text-xs">
                {count}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickFilters;
