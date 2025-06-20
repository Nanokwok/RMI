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
      <div className="w-full h-auto p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm flex items-center gap-4">
        <div className="flex flex-row w-full items-center">
          <p className="text-blue-700">Active Filters:</p>
          <div className="flex flex-wrap ml-4 gap-2">
            {activeFilter.name.map((filter, index) => (
              <p
                key={index}
                className="bg-slate-50 text-slate-600 px-4 py-2 rounded-md border border-slate-200 font-semibold"
              >
                {filter}
              </p>
            ))}
          </div>
        </div>
        <div className="flex gap-2 whitespace-nowrap ml-auto">
          {planDetails.planDetails.map((detail, index) => (
            <span key={index} className="text-blue-500 text-sm">
              Showing {detail.numberOfPlan} plans • {detail.numberOfTasks} tasks
              • {detail.numberOfOverdue} overdue
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
