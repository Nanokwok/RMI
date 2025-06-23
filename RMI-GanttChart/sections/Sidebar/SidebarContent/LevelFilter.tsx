import { useState } from "react";
import { LuTriangleAlert } from "react-icons/lu";
import Checkbox from "../../../components/Checkbox";
import { Badge } from "../../../components/FilterBadge";
import { RiskLevel } from "../filter_options";
import FilterSectionHeader from "../../../components/FilterSectionHeader";
import { useFilter } from "../FilterContext";

const LevelFilter = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { state, dispatch } = useFilter();

  const toggleStatus = (status: string) => {
    dispatch({ type: "TOGGLE_LEVEL", payload: status });
  };

  return (
    <>
      <FilterSectionHeader
        icon={<LuTriangleAlert className="w-4 h-4" />}
        title="Risk Level"
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      />

      {isExpanded && (
        <div className="py-1 space-y-1 px-7">
          {RiskLevel.map((status) => {
            const label = `${status.label} risk`;
            return (
              <div key={label} className="flex items-center justify-between">
                <Checkbox
                  label={<Badge variant="risk" level={status.label as any} />}
                  checked={state.level.includes(label)}
                  onChange={() => toggleStatus(label)}
                />
              </div>
            );
          })}
          <div className="pb-2" />
        </div>
      )}

      <div className="divider" />
    </>
  );
};

export default LevelFilter;
