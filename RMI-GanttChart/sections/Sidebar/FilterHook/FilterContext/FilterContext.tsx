"use client";

import { createContext, useReducer, useContext } from "react";
import type { FilterContextType } from "../../../../types/sidebar-filter-types";
import { initialState, initialAppliedState } from "./filter-constants";
import { filterReducer } from "./filter-reducer";

const FilterContext = createContext<FilterContextType>({
  state: initialState,
  appliedState: initialAppliedState,
  dispatch: () => null,
  applyFilters: () => null,
  clearAndApplyFilters: () => null,
  removeAndApplyFilter: () => null,
});

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const [appliedState, setAppliedState] = useReducer(
    filterReducer,
    initialAppliedState
  );

  const applyFilters = () => {
    setAppliedState({ type: "CLEAR_ALL" });
    // Copy current state to applied state
    Object.keys(state).forEach((key) => {
      if (key === "planTasksStatus" && state.planTasksStatus.length > 0) {
        state.planTasksStatus.forEach((status) => {
          setAppliedState({ type: "TOGGLE_PLAN_TASK_STATUS", payload: status });
        });
      }
      if (key === "level" && state.level.length > 0) {
        state.level.forEach((level) => {
          setAppliedState({ type: "TOGGLE_LEVEL", payload: level });
        });
      }
      if (key === "categories" && state.categories.length > 0) {
        state.categories.forEach((category) => {
          setAppliedState({ type: "ADD_CATEGORY_SUB", payload: category });
        });
      }
      if (key === "timeline") {
        setAppliedState({ type: "SET_TIMELINE", payload: state.timeline });
      }
    });
  };

  const clearAndApplyFilters = () => {
    dispatch({ type: "CLEAR_ALL" });
    setAppliedState({ type: "CLEAR_ALL" });
  };

  const removeAndApplyFilter = (
    type:
      | "planTasksStatus"
      | "level"
      | "quickFilters"
      | "categories"
      | "timeline",
    label: string
  ) => {
    if (type === "timeline") {
      if (label === "Overdue only") {
        dispatch({ type: "SET_TIMELINE", payload: { showOverdue: false } });
        setAppliedState({
          type: "SET_TIMELINE",
          payload: { showOverdue: false },
        });
      } else {
        dispatch({
          type: "SET_TIMELINE",
          payload: { startDate: "", endDate: "" },
        });
        setAppliedState({
          type: "SET_TIMELINE",
          payload: { startDate: "", endDate: "" },
        });
      }
    } else {
      const actionType =
        type === "planTasksStatus"
          ? "REMOVE_PLAN_TASK_STATUS"
          : type === "level"
          ? "REMOVE_LEVEL"
          : type === "quickFilters"
          ? "REMOVE_QUICK_FILTER"
          : "REMOVE_CATEGORY_SUB";

      dispatch({ type: actionType, payload: label });
      setAppliedState({ type: actionType, payload: label });
    }
  };

  return (
    <FilterContext.Provider
      value={{
        state,
        appliedState,
        dispatch,
        applyFilters,
        clearAndApplyFilters,
        removeAndApplyFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
