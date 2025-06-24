import { useFilter } from "./FilterContext/FilterContext";
import { initialPlans } from "../../../src/initialPlans";
import { FilterPlans } from "./FilterPlans";
import { useMemo } from "react";

export const useAppliedFilteredPlans = () => {
  const { appliedState } = useFilter();

  return useMemo(() => {
    return FilterPlans(initialPlans, appliedState);
  }, [appliedState]);
};

export default useAppliedFilteredPlans;
