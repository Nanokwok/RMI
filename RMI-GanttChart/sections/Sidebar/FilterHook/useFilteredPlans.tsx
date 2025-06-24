import { useFilter } from "./FilterContext/FilterContext";
import { initialPlans } from "../../../src/initialPlans";
import { FilterPlans } from "./FilterPlans";
import { useMemo } from "react";

export const useFilteredPlans = () => {
  const { state } = useFilter();

  return useMemo(() => {
    return FilterPlans(initialPlans, state);
  }, [state]);
};
