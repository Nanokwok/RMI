import { MockedQuick } from "../filter_options";
import { useFilter } from "../FilterContext";

const QuickFilters = () => {
  const { state, dispatch } = useFilter();

  const toggleQuick = (label: string) => {
    dispatch({ type: "TOGGLE_QUICK_FILTER", payload: label });
  };

  return (
    <>
      <div>
        <label className="text-sm font-medium text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Quick Filters
        </label>
        <div className="flex flex-wrap mt-1 gap-1">
          {MockedQuick.map((filter) => {
            const isActive = state.quickFilters.includes(filter.label);
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
                  {filter.count}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default QuickFilters;
