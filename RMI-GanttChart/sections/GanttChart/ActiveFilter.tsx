const activeFilter = {
  name: ["All Categories", "01/01/2025 - 31/03/2025"],
};

const planDetails = {
  planDetails: [
    {
      numberOfPlan: 54,
      numberOfTasks: 156,
      numberOfOverdue: 23,
    },
  ],
};

export default function ActiveFilter() {
  return (
    <>
      <div className="flex items-center w-full h-auto p-4 border border-blue-200 rounded-lg bg-blue-50 shadow-sm gap-4">
        <div className="flex flex-row items-center w-full">
          <p className="text-blue-700">Active Filters:</p>
          <div className="flex flex-wrap ml-4 gap-2">
            {activeFilter.name.map((filter, index) => (
              <p
                key={index}
                className="px-4 py-2 font-semibold border bg-slate-50 text-slate-600 rounded-md border-slate-200"
              >
                {filter}
              </p>
            ))}
          </div>
        </div>
        <div className="flex ml-auto gap-2 whitespace-nowrap">
          {planDetails.planDetails.map((detail, index) => (
            <span key={index} className="text-sm text-blue-500">
              Showing {detail.numberOfPlan} plans • {detail.numberOfTasks} tasks
              • {detail.numberOfOverdue} overdue
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
