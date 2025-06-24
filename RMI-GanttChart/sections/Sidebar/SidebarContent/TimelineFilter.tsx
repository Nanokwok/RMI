import { LuCalendar } from "react-icons/lu";
import Toggle from "../../../components/Toggle";
import Input from "../../../components/Input";
import FilterSectionHeader from "../../../components/FilterSectionHeader";
import { useFilter } from "../FilterHook/FilterContext/FilterContext";
import { useState } from "react";

const TimelineFilter = () => {
  const { state, dispatch } = useFilter();
  const { startDate, endDate, showOverdue } = state.timeline;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStartDateChange = (value: string) => {
    dispatch({ type: "SET_TIMELINE", payload: { startDate: value } });
  };

  const handleEndDateChange = (value: string) => {
    dispatch({ type: "SET_TIMELINE", payload: { endDate: value } });
  };

  const handleToggleOverdue = (checked: boolean) => {
    dispatch({ type: "SET_TIMELINE", payload: { showOverdue: checked } });
  };

  return (
    <>
      <FilterSectionHeader
        icon={<LuCalendar className="w-4 h-4" />}
        title="Timeline"
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      />

      {isExpanded && (
        <div className="py-1 space-y-1 px-7">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-black">
              Show Overdue Only
            </span>
            <Toggle checked={showOverdue} onChange={handleToggleOverdue} />
          </div>

          <div className="py-1 space-y-1">
            <div className="flex flex-col pt-2 pb-2 space-y-2">
              <label className="mb-1 text-base font-medium text-black">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                variant="primary"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="mb-1 text-base font-medium text-black">
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => handleEndDateChange(e.target.value)}
                variant="primary"
              />
            </div>
          </div>

          <div className="pb-2" />
        </div>
      )}

      <div className="divider" />
    </>
  );
};

export default TimelineFilter;
