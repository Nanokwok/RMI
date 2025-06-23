import { useState } from "react";
import { LuTarget } from "react-icons/lu";
import Checkbox from "../../../components/Checkbox";
import { PlanTaskStatus } from "../filter_options";
import FilterSectionHeader from "../../../components/FilterSectionHeader";
import { useFilter } from "../FilterContext";

const PlanTasksStatusFilter = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { state, dispatch } = useFilter();

  const toggleStatus = (status: string) => {
    dispatch({ type: "TOGGLE_PLAN_TASK_STATUS", payload: status });
  };

  return (
    <>
      <FilterSectionHeader
        icon={<LuTarget className="w-4 h-4" />}
        title="Plans & Tasks Status"
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      />

      {isExpanded && (
        <div className="py-1 space-y-1 px-7">
          {PlanTaskStatus.map((status) => (
            <div
              key={status.label}
              className="flex items-center justify-between"
            >
              <Checkbox
                label={status.label}
                checked={state.planTasksStatus.includes(status.label)}
                onChange={() => toggleStatus(status.label)}
              />
            </div>
          ))}
          <div className="pb-2" />
        </div>
      )}

      <div className="divider" />
    </>
  );
};

export default PlanTasksStatusFilter;
